const jwt = require('jsonwebtoken');
const { errorUnauthorized } = require('../utils/statuses');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(errorUnauthorized).send({ message: 'Необходима авторизация' });
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
