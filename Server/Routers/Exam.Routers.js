const express = require('express');
const router = express.Router();
const examController = require('../Controllers/Exam.Controllers');

router.post('/companies/:id/exams', examController.createExam);
router.post('/getExambyId/', examController.getExamById);
router.post('/getByCompany', examController.getExamsByCompanyId);
module.exports = router;
