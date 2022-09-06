const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  createUserValidator,
  loginValidator,
  updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/validators');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.patch('/me', updateProfileValidator, updateProfile);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
