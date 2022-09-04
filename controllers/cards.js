const Card = require('../models/card');
const ErrorBadRequest = require('../utils/errors/error_Bad_Request');
const ErrorForbidden = require('../utils/errors/error_Forbidden');
const ErrorNotFound = require('../utils/errors/error_Not_Found');

const getCards = async (req, res, next) => {
  const cards = await Card.find({}).populate(['owner', 'likes']);
  try {
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest('Переданы некорректные данные при создании карточки'));
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (!card) {
      throw new ErrorNotFound('Карточка с указанным id не найдена.');
    }
    if (card.owner.valueOf() === req.user._id) {
      await Card.deleteOne({ _id: id });
      res.send(card);
    } else {
      throw new ErrorForbidden('Карточки другого пользователя удалять запрещено');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Передан несуществующий id карточки'));
      return;
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new ErrorNotFound('Передан несуществующий id карточки');
    }
    res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Переданы некорректные данные для постановки лайка'));
      return;
    }
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new ErrorNotFound('Передан несуществующий id карточки');
    }
    res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Переданы некорректные данные для снятия лайка'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
