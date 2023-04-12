const Company = require('../Models/Company.Models');
const Exam = require('../Models/Exam.Models');
const Question = require('../Models/Question.Models');
const jwt = require("jsonwebtoken");
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
      questionsArray.push({ question: question.question });
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
  const examId = req.params.id;

  try {
    const exam = await Exam.findById(examId);

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
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "you are not login Please login" });
  }

  const token = auth.split(" ")[1];
  try {
    const verify = jwt.verify(JSON.parse(token), process.env.SECRET);
    const company = await Company.findById(req.body.companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    const exams = await Exam.find({ _id: { $in: company.exams } });
    res.status(200).json(exams);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports = {
  createExam,
  getExamById,
  getExamsByCompanyId
};
