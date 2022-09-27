const router = require('express').Router();
const { getAllCards, createCard, deleteCardOnId } = require('../controllers/cards');

router.get('/users', getAllCards);
router.post('/users/:userId', createCard);
router.delete('/cards/:cardId', deleteCardOnId);

//router.put('/cards/:cardId/likes', null);  //!
//router.delete('/cards/:cardId/likes', null);  //!

module.exports = router;