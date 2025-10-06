const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

exports.protectAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.level !== 'Platinum') return res.status(403).json({ error: 'Admin only' });
  next();
};