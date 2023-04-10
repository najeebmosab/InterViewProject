const Question = require('../models/question');

const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuestion,
};
