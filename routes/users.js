const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  updateProfileValidator,
  updateAvatarValidator,
  idValidator,
} = require('../middlewares/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValidator, getUserById);
router.patch('/me', updateProfileValidator, updateProfile);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
