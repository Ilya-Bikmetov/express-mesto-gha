const router = require('express').Router();
const express = require('express');
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

router.post('/signup', express.json(), createUser);
router.post('/signin', express.json(), login);
router.use(auth);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.patch('/me', express.json(), updateProfile);
router.patch('/me/avatar', express.json(), updateAvatar);

module.exports = router;
