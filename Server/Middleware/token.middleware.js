const jwt = require("jsonwebtoken");
const { models } = require("mongoose");
const { model } = require("mongoose");

const checkToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Invalid Authorization header");
        }

        const token = authHeader.substring("Bearer ".length);
        const decoded = jwt.verify(JSON.parse(token), process.env.SECRET);

        return decoded;
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized you are not login please login" });
    }
};

module.exports = checkToken;
