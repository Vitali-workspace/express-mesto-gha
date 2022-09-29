const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: 'внутренняя ошибка сервера' }))
}


module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then(newCard => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
};


module.exports.deleteCardOnId = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрошенный id не найден' })
        return;
      }

      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}


module.exports.putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        res.status(404).send({ message: 'Запрошенный id не найден' })
        return;
      }

      res.send({ data: like })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}


module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        res.status(404).send({ message: 'Запрошенный id не найден' })
        return;
      }

      res.send({ data: like })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ошибка в запросе' })
      } else {
        res.status(500).send({ message: 'внутренняя ошибка сервера' })
      }
    })
}