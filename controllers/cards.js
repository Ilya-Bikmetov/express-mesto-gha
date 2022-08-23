const Card = require('../models/card');
const { error400, error404, error500 } = require('../utils/errors');

const getCards = async (req, res) => {
  const cards = await Card.find({});
  try {
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(error500);
  }
};

const createCard = async (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  try {
    if (!name || !link || !owner) {
      res.status(400).send(error400);
      return;
    }
    const card = await Card.create({ name, link, owner });
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(error500);
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByIdAndRemove(id);
    if (!card) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(error500);
  }
};

const likeCard = async (req, res) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    if (!cardId || !userId) {
      res.status(400).send(error400);
      return;
    }
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(error500);
  }
};

const dislikeCard = async (req, res) => {
  const { cardId, userId = req.user._id } = req.params;
  try {
    if (!cardId || !userId) {
      res.status(400).send(error400);
      return;
    }
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(error500);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
