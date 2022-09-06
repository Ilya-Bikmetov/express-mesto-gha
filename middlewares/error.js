const { errorServer } = require('../utils/constants');
const ErrorBadRequest = require('../utils/errors/error_Bad_Request');

const error = (err, req, res, next) => {
  if (err.message === 'Validation failed') {
    const errorValidate = new ErrorBadRequest('Ошибка валидации');
    res.status(errorValidate.statusCode).send({ message: errorValidate.message });
    return;
  }
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(errorServer).send({ message: 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = error;
