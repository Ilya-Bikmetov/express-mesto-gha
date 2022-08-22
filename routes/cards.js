const router = require('express').Router();
const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', express.json(), createCard);
router.delete('/:id', deleteCard);

module.exports = router;
