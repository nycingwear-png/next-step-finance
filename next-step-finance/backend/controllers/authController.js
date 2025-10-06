const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

exports.register = async (req, res) => {
  try {
    const { phone, firstName, lastName, idNumber, address, employment, industry, workAddress, guarantorPhone, email } = req.body;
    const { frontId, backId, holderPhoto } = req.files || {};
    const hasLicense = req.body.hasLicense === 'Yes';

    // Hash password if provided, else generate
    // ... (SMS verification logic)
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    twilio.messages.create({ body: `Verification: ${verificationCode}`, from: process.env.TWILIO_PHONE, to: phone });

    // Log form to file
    const fs = require('fs');
    fs.appendFileSync('server-files/submissions.log', `${new Date()}: ${firstName} ${lastName} - ${JSON.stringify(req.body)}\n`);

    // Save user
    const hashedPassword = await bcrypt.hash('default', 10); // Placeholder
    const user = new User({ phone, firstName, lastName, idNumber, frontId: frontId[0].path, backId: backId[0].path, holderPhoto: holderPhoto[0].path, hasLicense, address, employment, industry, workAddress, guarantorPhone, email, password: hashedPassword, level: 'Regular', balance: 0 });
    await user.save();

    res.status(201).json({ message: 'Registered', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, code } = req.body;
    // Verify code...
    const user = await User.findOne({ phone });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};