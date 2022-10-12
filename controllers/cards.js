const Card = require('../models/card');

const STATUS_BAD_REQUEST = 400;
const FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.deleteCardOnId = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndRemove(id)
    .then((card) => {
      const owner = req.user._id;
      const otherUser = card.user._id;

      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Запрошенный id не найден' });
        return;
      }

      if (owner !== otherUser) {
        return res.status(FORBIDDEN).send({ message: 'Нет прав на удаление карточки' });
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Запрошенный id не найден' });
        return;
      }

      res.send({ data: like });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Запрошенный id не найден' });
        return;
      }

      res.send({ data: like });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({ message: 'ошибка в запросе' });
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'внутренняя ошибка сервера' });
      }
    });
};
