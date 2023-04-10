const calculateExamScoreMiddleware = (req, res, next) => {
    const { userId, examId, answers } = req.body;

    calculateExamScore(userId, examId, answers)
        .then((result) => {
            res.locals.result = result;
            next();
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};
module.exports = calculateExamScoreMiddleware;
