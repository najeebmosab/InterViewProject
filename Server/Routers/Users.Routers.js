const express = require('express');
const router = express.Router();
const { createUser, calculateExamScore,login } = require('../Controllers/Users.Controllers');
const { calculateExamScoreMiddleware } = require("../Middleware/calculateExamScore.Middleware");
const { errorMiddleware } = require("../Middleware/middleware");
router.post('/', createUser);
router.post('/calculateExamScore', calculateExamScore);
router.post('/login', login);
module.exports = router;
