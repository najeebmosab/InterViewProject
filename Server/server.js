const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Routers/Users.Routers');
const companyRouter = require('./Routers/Company.Routers');
const examRouter = require('./Routers/Exam.Routers');
const errorHandler = require('./Middleware/middleware');
const dotenv = require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Enable CORS
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}));

// Parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount user router
app.use('/users', userRouter);
app.use('/company', companyRouter);
app.use('/exam', examRouter);
console.log(__dirname + '/uploads');
app.use('/uploads', express.static(__dirname + '/uploads'));
// Mount error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
