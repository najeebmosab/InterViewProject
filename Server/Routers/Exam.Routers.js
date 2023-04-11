const express = require('express');
const router = express.Router();
const examController = require('../Controllers/Exam.Controllers');

router.post('/companies/:id/exams', examController.createExam);
router.get('/:id', examController.getExamById);
module.exports = router;
