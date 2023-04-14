const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
  }],
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
},{ timestamps: true });


const Company = mongoose.model('Company', companySchema);

module.exports = Company;
