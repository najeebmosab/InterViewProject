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
  });

  const Exam = mongoose.model('Exam', examSchema);

  module.exports = Exam;
