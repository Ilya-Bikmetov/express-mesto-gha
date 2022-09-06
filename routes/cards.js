const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
// const auth = require('../middlewares/auth');
const { createCardValidator } = require('../middlewares/validators');

// router.use(auth);
router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
