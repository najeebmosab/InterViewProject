const Company = require('../Models/Company.Models');
const Exam = require('../Models/Exam.Models');
const Question = require('../Models/Question.Models');
const checkTokens = require("../Middleware/token.middleware");
// POST route to create an exam with questions for a company
const createExam = async (req, res) => {
  try {

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const { name, questions } = req.body;

    // Create an array to hold the questions with their calculated correct answers
    const questionsArray = [];

    // Calculate the correct answer for each question using the OpenAI API

    for (const question of questions) {
      questionsArray.push({ question: question });
    }

    // Create the questions for the exam
    const createdQuestions = await Question.insertMany(questionsArray);

    // Create the exam for the company
    const exam = new Exam({ name, questions: createdQuestions });
    const createdExam = await exam.save();

    // Add the exam to the company
    company.exams.push(createdExam);
    await company.save();

    res.status(201).json({ exam: createdExam });
  } catch (error) {
    // console.error(error);
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const getExamById = async (req, res, next) => {
  try {
    const verify = checkTokens(req, res);
    const exam = await Exam.findById(req.body.id).populate('questions');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getExamsByCompanyId = async (req, res) => {

  try {
    const verify = checkTokens(req, res);
    const company = await Company.findById(req.body.companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    const exams = await Exam.find({ _id: { $in: company.exams } });
    if (exams.length === 0) {
      return res.status(200).json({ message: `no exams for this company ${company.name}` });
    }
    return res.status(200).json(exams);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const deleteExam = async (req, res) => {
  const { examId } = req.body;

  try {
    // Find the exam and populate the questions
    await Exam.findByIdAndDelete(examId);
    await Question.deleteMany({ exam: examId });

    res.status(200).json({
      message: 'Exam and all associated questions deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
const updateExam = async (req, res) => {
  try {
    const { name, questions } = req.body;

    // Update exam name
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    // Update questions
    for (const question of questions) {
      if (question._id) {
        await Question.findByIdAndUpdate(
          question._id,
          { question: question?.questionText},
          { new: true }
        );
      }
    }
    // Save updated exam
    await exam.save();

    res.json({exam});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createExam,
  getExamById,
  getExamsByCompanyId,
  deleteExam,
  updateExam
};
