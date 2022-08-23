const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) { res.status(500).send({ message: 'На сервере произошла ошибка' }); }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: ' Пользователь по указанному id не найден.' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Переданы некорректный id пользователя' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
    return;
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateProfile = async (req, res) => {
  const { name, about, id = req.user._id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send({ message: 'Пользователь с указанным id не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar, id = req.user._id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send({ message: 'Пользователь с указанным id не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
};
