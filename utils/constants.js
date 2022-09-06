const errorServer = 500;
const avatarRegExp = /https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/;
const cardRegExp = avatarRegExp;

module.exports = {
  errorServer,
  avatarRegExp,
  cardRegExp,
};
