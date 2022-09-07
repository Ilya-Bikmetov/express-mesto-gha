const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const ErrorNotFound = require('./utils/errors/error_Not_Found');
const { createUser, login } = require('./controllers/users');
const { loginValidator } = require('./middlewares/validators');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(cookieParser());
app.use(express.json());
app.post('/signup', createUser);
app.post('/signin', loginValidator, login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Такого запроса нет'));
});

app.use(errors());
app.use(error);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
