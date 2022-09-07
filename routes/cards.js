const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardValidator, idValidator, cardIdValidator } = require('../middlewares/validators');

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', idValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
