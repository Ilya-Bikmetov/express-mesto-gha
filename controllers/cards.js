const Card = require('../models/card');
const {
  errorBadRequest,
  errorNotFound,
  errorServer,
  resOk,
} = require('../utils/statuses');

const getCards = async (req, res) => {
  const cards = await Card.find({}).populate(['owner', 'likes']);
  try {
    res.status(resOk).send(cards);
  } catch (err) {
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(resOk).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные при создании карточки' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByIdAndRemove(id);
    if (!card) {
      res.status(errorNotFound).send({ message: 'Карточка с указанным id не найдена.' });
      return;
    }
    res.status(resOk).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Передан несуществующий id карточки' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const likeCard = async (req, res) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(errorNotFound).send({ message: 'Передан несуществующий id карточки' });
      return;
    }
    res.status(resOk).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные для постановки лайка' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const dislikeCard = async (req, res) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(errorNotFound).send({ message: 'Передан несуществующий id карточки' });
      return;
    }
    res.status(resOk).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные для снятия лайка' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
