const express = require('express');
const mongoose = require('mongoose');
const { errorNotFound } = require('./utils/statuses');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '63021e20b453a1f760429337',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  res.status(errorNotFound).send({ message: 'Такого запроса нет' });
  next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
