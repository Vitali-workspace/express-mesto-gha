const User = require('../models/user');


module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'внутренняя ошибка сервера' }))
}


module.exports.getUserId = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((id) => {
      if (!id) {
        res.status(404).send({ message: 'пользователь не найден' });
        return;
      }
      res.send({ data: id })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send({ data: newUser })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}


module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      res.send({ data: newUser })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'не удалось получить данные' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}


module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      res.send({ data: newAvatar })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'не удалось получить данные' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}
