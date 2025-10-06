const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  idNumber: String,
  frontId: String, // Path
  backId: String,
  holderPhoto: String,
  hasLicense: Boolean,
  address: String,
  employment: Boolean,
  industry: String,
  workAddress: String,
  guarantorPhone: String,
  email: String,
  password: String,
  level: { type: String, enum: ['Regular', 'Silver', 'Gold', 'Diamond', 'Platinum'], default: 'Regular' },
  balance: { type: Number, default: 0 },
  permissions: { location: Boolean, contacts: Boolean, whatsapp: Boolean, notifications: Boolean },
  location: { lat: Number, lng: Number },
  transactions: [{ date: Date, amount: Number, type: String }],
  commissions: [{ month: String, total: Number, breakdown: [{ from: String, date: Date, amount: Number }] }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  outstanding: [{ member: String, amount: Number, dueDate: Date, reminds: Number }]
}, { timestamps: true });

// Log permissions to file
userSchema.post('save', function(doc) {
  if (doc.permissions) {
    const fs = require('fs');
    fs.appendFileSync('server-files/permissions.log', `${new Date()}: ${doc.firstName} ${doc.lastName} - ${JSON.stringify(doc.permissions)} - Location: ${doc.location}\n`);
  }
});

module.exports = mongoose.model('User', userSchema);