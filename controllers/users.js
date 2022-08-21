const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) { res.status(500).send({ message: err.message }); }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: 'Такого пользователя нет' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Неправильный id пользователя' });
      return;
    }
    res.status(500).send({ message: err.message, ...err });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) { res.status(500).send({ message: err.message }); }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
