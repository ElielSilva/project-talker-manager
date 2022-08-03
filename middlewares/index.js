const validateAuthorization = require('./validateAuthorization');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateTalkWatchedAt = require('./validateTalkWatchedAt');
const validateTalkRate = require('./validateTalkRate');

module.exports = {
  validateAuthorization,
  validateName, 
  validateAge, 
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
};