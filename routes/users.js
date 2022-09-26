const router = require('express').Router();
const { getAllUsers, getUserId, createUser } = require('../controllers/users');

console.log('роутеры сработали'); //!

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserId); //! возможно не правильно
router.post('/users', createUser);

module.exports = router;