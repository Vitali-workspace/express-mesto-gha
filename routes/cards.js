const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardOnId,
  putLikeCard,
  dislikeCard
} = require('../controllers/cards');


router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardOnId);
router.put('/cards/:cardId/likes', putLikeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;