const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  errorBadRequest,
  errorNotFound,
  errorServer,
  errorUnauthorized,
  resOk,
} = require('../utils/statuses');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(resOk).send(users);
  } catch (err) { res.status(errorServer).send({ message: 'На сервере произошла ошибка' }); }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(errorNotFound).send({ message: ' Пользователь по указанному id не найден.' });
      return;
    }
    res.status(resOk).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректный id пользователя' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    if (!validator.isEmail(email)) {
      res.status(errorBadRequest).send({ message: 'Передан некорректный email' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(resOk).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
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
      res.status(errorNotFound).send({ message: 'Пользователь с указанным id не найден' });
      return;
    }
    res.status(resOk).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
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
      res.status(errorNotFound).send({ message: 'Пользователь с указанным id не найден' });
      return;
    }
    res.status(resOk).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(errorUnauthorized).send({ message: 'Неправильный email или пароль' });
      return;
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(errorUnauthorized).send({ message: 'Неправильный email или пароль' });
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
};
