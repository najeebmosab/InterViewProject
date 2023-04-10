const express = require('express');
const router = express.Router();
const interviewController = require('../Controllers/Interview.Controller');
const { authenticateUser, authenticateCompany } = require('../middlewares/authentication');

router.post('/:userId/companies/:companyId', 
  authenticateUser, authenticateCompany, interviewController.createInterview);

module.exports = router;
