const router = require('express').Router();

const {
  getAllUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getMyUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserId);
router.get('/users/me', getMyUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
