const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(user) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: '1h' })
    console.log("token", token);
    return token;
}

function Verify(token) {
    try {
        console.log(token);
        const verfiy = jwt.verify(token, process.env.SECRET)
        console.log("verfiy", verfiy);
        return verfiy;
    }catch(err){
        console.log(err);
    }
}

module.exports = { createToken, Verify }