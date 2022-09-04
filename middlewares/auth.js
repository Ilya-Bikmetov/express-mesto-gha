const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../utils/errors/error_Unauthorized');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized('Необходима авторизация');
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
