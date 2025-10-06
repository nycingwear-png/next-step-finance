const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports.sendCode = (phone, code) => {
  return twilio.messages.create({
    body: `Verification Code: ${code}`,
    from: process.env.TWILIO_PHONE,
    to: phone
  });
};