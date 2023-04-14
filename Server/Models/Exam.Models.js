  const mongoose = require('mongoose');

  const examSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
  },{ timestamps: true }); // Add this to enable timestamps

  const Exam = mongoose.model('Exam', examSchema);

  module.exports = Exam;
