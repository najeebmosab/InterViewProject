const Interview = require('../models/interview');

const createInterview = async (req, res) => {
  try {
    const { userId, companyId } = req.params;
    const user = req.user;
    const company = req.company;
    const interview = new Interview({ user: user._id, company: company._id });
    await interview.save();
    user.interviews.push(interview);
    company.interviews.push(interview);
    await user.save();
    await company.save();
    return res.status(201).json(interview);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInterview,
};
