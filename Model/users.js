const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  token: String
  // add other fields as needed
});

exports.User = mongoose.model('User', userSchema);