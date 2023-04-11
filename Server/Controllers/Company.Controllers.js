const Company = require('../Models/Company.Models');
const jwt = require("../JWT/tokenApi");


const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    return res.status(201).json(company);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getAllCompanies = async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = auth.split(" ")[1];
    const companies = await Company.find();
    if (!companies) return res.status(500).json({ message: "No Company in Data Base" });
    return res.status(200).json({ companies });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


module.exports = {
  createCompany,
  getAllCompanies
};
