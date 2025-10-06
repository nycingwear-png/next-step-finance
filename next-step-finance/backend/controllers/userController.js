const User = require('../models/User');

exports.getHomeData = async (req, res) => {
  const user = await User.findById(req.userId).populate('members');
  res.json({
    level: user.level,
    balance: user.balance,
    transactions: user.transactions,
    commissions: user.commissions
  });
};

exports.addMember = async (req, res) => {
  const { name, phone, email, level, amount } = req.body;
  // Create new user or invite...
  const currentUser = await User.findById(req.userId);
  currentUser.members.push({ name, phone }); // Simplified
  await currentUser.save();
  res.json({ message: 'Member added' });
};

exports.getOutstanding = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.outstanding);
};