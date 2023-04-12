const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/Company.Controllers');
router.post('/', companyController.createCompany);
router.get('/getAllCompany', companyController.getAllCompanies);
router.put('/update/:id', companyController.updateCompany);

module.exports = router;
