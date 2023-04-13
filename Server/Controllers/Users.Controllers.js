const UserModel = require('../Models/Users.Models');
const ExamModel = require('../Models/Exam.Models');
const ExamResultModel = require('../Models/ExamResult.Models');
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.APIKEY;
const configuration = new Configuration({
  apiKey: apiKey,
});
const jwt = require("../JWT/tokenApi");
const checkTokens = require("../Middleware/token.middleware");
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
    const token = await jwt.createToken(user);
    return res.status(201).json(user, token);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createExamForUser = async (req, res) => {
  try {
    const {examId } = req.body;
    const verfiy = await checkTokens(req,res)
    console.log(verfiy);
    const user = await UserModel.findById(verfiy.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }

    const exam = await ExamModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    user.exams.push(exam._id);
    await user.save();

    return true;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const calculateExamScore = async (req, res) => {
  try {
    const { answers } = req.body;
    const result = await createExamForUser(req, res);
    const verfiy = await checkTokens(req,res)
    if (!result) return;
    const user = await UserModel.findById(verfiy.id).populate('exams');
    const exam = await ExamModel.findById(req.body.examId).populate('questions');

    const openai = new OpenAIApi(configuration);
    let score = 0;
    for (let i = 0; i < exam.questions.length; i++) {
      const question = exam.questions[i];
      const userAnswer = answers.find(answer => answer.questionId == question._id);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `check if the user asnwer:${userAnswer.answer} for this question: ${question.question} is correct return true or false`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const correctAnswer = response.data.choices[0].text.trim();
      if (correctAnswer.toLocaleLowerCase() === 'true') {
        score++;
      }
    }
    // Calculate the total number of questions and passing score
    const passingPercentage = 70;
    const totalQuestions = exam.questions.length;
    const passingScore = Math.ceil((passingPercentage / 100) * totalQuestions);

    if (score < passingScore) {
      // If the user failed the exam, you can provide them with the option to retake it
      return res.status(200).json({ message: "You failed the exam. Do you want to retake it?", retake: true });
    }

    // If the user passed the exam, update examResults accordingly
    const examResult = new ExamResultModel({ exam: req.body.examId, score: score, passed: true });
    user.examResults.push(examResult);
    await examResult.save();

    user.examResults.push(examResult._id);
    await user.save();

    res.status(200).json({ score: score,passed: true,message:"you are passed an exam" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email Wrong" });
    }

    // Compare the provided password to the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password Wrong " });
    }

    // Generate a JWT token for the user
    const token = await jwt.createToken(user);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createUser,
  createExamForUser,
  calculateExamScore,
  login
};
