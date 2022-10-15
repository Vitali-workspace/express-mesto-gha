const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((id) => {
      if (!id) {
        res.status(STATUS_NOT_FOUND).send({ message: 'пользователь не найден' });
        return;
      }
      res.send({ data: id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((newUser) => {
          res.send({ data: newUser });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
          } else {
            res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
          }
        });
    }).catch(() => console.log('ошибка хеширования'));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'не удалось получить данные' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      res.send({ data: newAvatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'не удалось получить данные' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('логин введён', `${email}, ${password}`); //!
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user); //!
      const token = jwt.sign({ _id: user._id }, 'name-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).end();
    }).catch(() => {
      res.status(UNAUTHORIZED).send({ message: 'внутренняя ошибка сервера' });
      next(); //!
    });
};

module.exports.getMyUser = (req, res) => {
  const { _id } = req.user;

  User.find({ _id })
    .then((user) => {
      if (!user) {
        res.status(STATUS_NOT_FOUND).send({ message: 'пользователь не найден' });
      }
      return res.send(user);
    })
    .catch(() => {
      res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
    });
};
