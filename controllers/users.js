const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  errorBadRequest,
  errorNotFound,
  errorServer,
  errorUnauthorized,
} = require('../utils/statuses');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
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
    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректный id пользователя' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    res.send({ user });
  } catch (err) {
    res.status(errorServer).send({ message: err.message });
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
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные' });
      return;
    }
    if (err.code === 11000) {
      res.status(errorBadRequest).send({ message: 'Такой пользователь уже существует' });
      return;
    }
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
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
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    res.send(user);
  } catch (err) {
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
    res.send(user);
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
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      res.status(errorBadRequest).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      return;
    }
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
  getCurrentUser,
};
