const router = require('express').Router();
const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', express.json(), createUser);
router.patch('/me', express.json(), updateProfile);
router.patch('/me/avatar', express.json(), updateAvatar);
module.exports = router;
