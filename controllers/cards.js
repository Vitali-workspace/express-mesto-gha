const Card = require('../models/card');


module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен //!
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(newCard => res.send({ data: newCard }))
    .catch(err => res.status(500).send({ message: err.message }))
};


module.exports.deleteCardOnId = (req, res) => {
  //! функция удаления
}

