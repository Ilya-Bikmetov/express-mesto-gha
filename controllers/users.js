const User = require('../models/user');
const { error400, error404, error500 } = require('../utils/errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) { res.status(500).send(error500); }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send(error400);
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(error500);
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send(error400);
    }
    return res.status(500).send(error500);
  }
};

const updateProfile = async (req, res) => {
  const { name, about, id = req.user._id } = req.body;
  try {
    if (!name || !about || !id) {
      res.status(400).send(error400);
      return;
    }
    const user = await User.findByIdAndUpdate(id, { name, about }, { new: true });
    if (!user) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(user);
  } catch (err) { res.status(500).send(error500); }
};

const updateAvatar = async (req, res) => {
  const { avatar, id = req.user._id } = req.body;
  try {
    if (!avatar || !id) {
      res.status(400).send(error400);
      return;
    }
    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true });
    if (!user) {
      res.status(404).send(error404);
      return;
    }
    res.status(200).send(user);
  } catch (err) { res.status(500).send(error500); }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
};
