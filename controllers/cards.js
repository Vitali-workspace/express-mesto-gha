const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  console.warn('получены все карточки'); //!
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.createCard = (req, res) => {
  console.warn('сделана новая карточка'); //!
  const owner = req.user._id;
  const { name, link } = req.body;
  console.warn(owner); //!

  Card.create({ name, link, owner })
    .then(newCard => res.send({ data: newCard }))
    .catch(err => res.status(500).send({ message: err.message }))
};


module.exports.deleteCardOnId = (req, res) => {
  console.warn('карточка была удалена'); //!
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.putLikeCard = (req, res) => {
  console.warn('Поставлен лайк'); //!
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}


module.exports.dislikeCard = (req, res) => {
  console.warn('Лайк удалён'); //!
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}