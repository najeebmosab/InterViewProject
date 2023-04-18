const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  userEmail:{
    type:String,
    required: true,
  }
},{ timestamps: true });

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
