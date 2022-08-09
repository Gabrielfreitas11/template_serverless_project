const mongoose = require('mongoose');

exports.closeConnection = async () => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
};