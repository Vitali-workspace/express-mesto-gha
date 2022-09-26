const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  console.log('возврат пользователя');
  // возвращает всех пользователей
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.getUserId = (req, res) => {
  //  возвращает пользователя по _id

}


module.exports.createUser = (req, res) => {
  // создаёт пользователя
  console.log('создание пользователя');

  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      console.log('отправился пост');
      res.send({ data: newUser })
    })
    .catch(err => res.status(500).send({ message: err.message }))
}

