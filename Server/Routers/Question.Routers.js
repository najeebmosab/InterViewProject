const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/Question.Controller');

router.post('/', questionController.createQuestion);

module.exports = router;
