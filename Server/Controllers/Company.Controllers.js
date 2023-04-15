const Company = require('../Models/Company.Models');
const jwt = require("../JWT/tokenApi");
const fs = require("fs");
const checkTokens = require("../Middleware/token.middleware");
const bcrypt = require('bcrypt');
const ExamResult = require("../Models/ExamResult.Models");
const createCompany = async (req, res) => {
  try {
    const existingCompany = await Company.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
    if (existingCompany) {
      return res.status(409).json({ message: 'Company with that email or name already exists' });
    }
    const company = new Company(req.body);
    const file = req.body.photo;
    let filename = null;
    if (file) {
      console.log('size', file.data.length);
      const parts = file.name.split('.');
      const ext = parts[parts.length - 1];
      filename = Date.now() + '.' + ext;
      const path = "C:\Users\najee\Desktop\mernFinalProject\interViewProject\Server/uploads/" + filename;
      const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
      const directory = "C:\Users\najee\Desktop\mernFinalProject\interViewProject\Server/uploads/";

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }

      fs.writeFile(path, bufferData, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          console.log('File saved:', path);
          company.photo = file ? filename : null;
        }
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    company.password = hashedPassword;
    await company.save();
    const token = jwt.createToken(company);
    return res.status(201).json({ company, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password Wrong " });
    }
    console.log(company);
    const token = await jwt.createToken(company);
    return res.status(200).json({ company, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getAllCompanies = async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = auth.split(" ")[1];
    const verfiy = jwt.Verify(JSON.parse(token));
    if (!verfiy) return res.status(401).json({ message: "Unauthorized" });
    const companies = await Company.find();
    if (!companies) return res.status(500).json({ message: "No Company in Data Base" });
    return res.status(200).json({ companies });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, photo, email, exams, interviews, users } = req.body;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { name, photo, email, exams, interviews, users },
      { new: true }
    );
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExamResultsByCompanyExams = async (req, res) => {
  try {
    const company = await Company.findById(req.body.companyId).populate('exams');
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const examIds = company.exams.map(exam => exam._id);
    const examResults = await ExamResult.find({ exam: { $in: examIds } }).populate('exam');
    if (examResults.length === 0) {
      return res.status(200).json({ message: 'no one pass exam' });
    }
    res.json({ examResults });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  getCompany,
  getExamResultsByCompanyExams
};
