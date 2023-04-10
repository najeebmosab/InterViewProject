const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
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
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;
