const Card = require('../models/card');

const getCards = async (req, res) => {
  const cards = await Card.find({});
  try {
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка', ...err });
  }
};

const createCard = async (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  try {
    if (!name || !link || !owner) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    const card = await Card.create({ name, link, owner });
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка', ...err });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByIdAndRemove(id);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка', ...err });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
