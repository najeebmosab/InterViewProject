const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
  }],
  companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }],
  examResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamResult',
  }],
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
