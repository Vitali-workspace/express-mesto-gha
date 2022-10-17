const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/validationLink');

const {
  getAllCards,
  createCard,
  deleteCardOnId,
  putLikeCard,
  dislikeCard,
} = require('../controllers/cards');


router.get('/cards', getAllCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regUrl),
  }),
}), createCard);


router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys(
    { cardId: Joi.string().required() },
  ),
}), deleteCardOnId);


router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys(
    { cardId: Joi.string().required() },
  ),
}), putLikeCard);


router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys(
    { cardId: Joi.string().required() },
  ),
}), dislikeCard);

module.exports = router;
