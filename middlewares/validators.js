const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const { avatarRegExp, cardRegExp } = require('../utils/constants');

const createUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(avatarRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),

  }),
});

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateProfileValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().regex(avatarRegExp),
  }),
});

const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(cardRegExp),
  }),
});

const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  updateProfileValidator,
  updateAvatarValidator,
  createCardValidator,
  getUserByIdValidator: idValidator,
  idValidator,
  cardIdValidator,
};
