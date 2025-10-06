const User = require('../models/User');
const fs = require('fs');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.updateUserBalance = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const user = await User.findByIdAndUpdate(id, { $inc: { balance: amount } }, { new: true });
  res.json(user);
};

exports.approveLoan = async (req, res) => {
  // Update loan status...
  res.json({ message: 'Approved' });
};

exports.getAllPermissions = async (req, res) => {
  // Read from log
  const data = fs.readFileSync('server-files/permissions.log', 'utf8');
  res.json({ logs: data.split('\n') });
};