const Company = require('../Models/Company.Models');

const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    return res.status(201).json(company);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
};
