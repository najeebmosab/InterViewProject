const UserModel = require('../Models/Users.Models');
const ExamModel = require('../Models/Exam.Models');
const ExamResultModel = require('../Models/ExamResult.Models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "A user with that email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createExamForUser = async (req, res) => {
  try {
    const { userId,examId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const exam = await ExamModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    user.exams.push(exam._id);
    await user.save();

    return res.status(201).json(exam);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const calculateExamScore = async (req, res) => {
  try {
    const { userId, examId, answers } = req.body;
    const result =await createExamForUser(req, res);
    console.log(result);
    if(!result)return res.status(500).json({ message: "Error server to creat exam" });
    const user = await UserModel.findById(userId).populate('exams');
    const exam = await ExamModel.findById(examId).populate('questions');

    let score = 0;
    exam.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    // Check if user passed the exam and update examResults accordingly
    let passed = score >= exam.passingScore;
    if (!passed) return res.status(500).json({ message: "you are faild" });
    const examResult = new ExamResultModel({ exam: examId, score: score, passed: score >= exam.passingScore });
    user.examResults.push(examResult);
    await examResult.save();

    user.examResults.push(examResult._id);
    await user.save();

    res.status(200).json({ score: score });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  createExamForUser,
  calculateExamScore,
};
