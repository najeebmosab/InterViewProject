const express = require('express');
const router = express.Router();
const { createUser, calculateExamScore } = require('../Controllers/Users.Controllers');
const { calculateExamScoreMiddleware } = require("../Middleware/calculateExamScore.Middleware");
const { errorMiddleware } = require("../Middleware/middleware");
router.post('/', createUser);
router.post('/:user_id/exams/:exam_id', calculateExamScore);

module.exports = router;
