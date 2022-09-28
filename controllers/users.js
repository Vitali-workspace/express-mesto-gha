const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  console.log('Получили всех пользователей');
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.getUserId = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((id) => {
      console.log('получили id пользователя'); //!
      res.send({ data: id })
    })
    .catch(err => res.status(500).send({ message: err.message }))


}


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      console.log('создался пользователь на сервер'); //!
      res.send({ data: newUser })
    })
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      console.log('обновился пользователь на сервере'); //!
      res.send({ data: newUser })
    })
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      console.log('обновился аватар на сервере'); //!
      res.send({ data: newAvatar })
    })
    .catch(err => res.status(500).send({ message: err.message }))
}
