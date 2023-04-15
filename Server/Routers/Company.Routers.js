const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/Company.Controllers');
router.post('/', companyController.createCompany);
router.post('/getCompany', companyController.getCompany);
router.get('/getAllCompany', companyController.getAllCompanies);
router.put('/update/:id', companyController.updateCompany);
router.post('/getExamResultsByCompanyExams', companyController.getExamResultsByCompanyExams);

module.exports = router;
