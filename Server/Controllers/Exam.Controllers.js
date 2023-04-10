const Company = require('../Models/Company.Models');
const Exam = require('../Models/Exam.Models');
const Question = require('../Models/Question.Models');
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.APIKEY;
// openai.apiKey = "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";
const configuration = new Configuration({
  apiKey: "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",
});
// POST route to create an exam with questions for a company
const createExam = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const { name, questions } = req.body;

    // Create an array to hold the questions with their calculated correct answers
    const questionsWithCorrectAnswers = [];

    // Calculate the correct answer for each question using the OpenAI API
    const openai = new OpenAIApi(configuration);
    for (const question of questions) {

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `What is the simple correct answer to the following question: ${question.question}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response.data.choices[0]);
      questionsWithCorrectAnswers.push({ question: question.question, correctAnswer });
    }

    // Create the questions for the exam
    const createdQuestions = await Question.insertMany(questionsWithCorrectAnswers);

    // Create the exam for the company
    const exam = new Exam({ name, questions: createdQuestions });
    const createdExam = await exam.save();

    // Add the exam to the company
    company.exams.push(createdExam);
    await company.save();

    res.status(201).json({ exam: createdExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  createExam,
};
