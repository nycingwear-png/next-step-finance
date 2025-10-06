const User = require('../models/User');

module.exports.getUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};