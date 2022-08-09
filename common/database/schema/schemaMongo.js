const mongoose = require('mongoose');
const { DateTime } = require('luxon-business-days');

const dt = DateTime.local().plus({'hours': -3}).plusBusiness({ days: 1 });

const schema = new mongoose.Schema({
  ip: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  cpf: {
    type: [String],
    unique: false,
  },
  errorExcess: {
    type: Boolean 
  },
  expireAt: {
    type: Date,
    default: new Date(dt.year, String(dt.month - 1).padStart(2, '0'), String(dt.day).padStart(2, '0')),
  },
});

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Clients', schema);
