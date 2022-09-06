const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const { avatarRegExp, cardRegExp } = require('../utils/constants');

const createUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(avatarRegExp),
    email: Joi.string().required(),
    password: Joi.string().required(),

  }),
});

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
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

module.exports = {
  createUserValidator,
  loginValidator,
  updateProfileValidator,
  updateAvatarValidator,
  createCardValidator,
};
