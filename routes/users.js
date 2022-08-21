const router = require('express').Router();
const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', express.json(), createUser);
module.exports = router;
