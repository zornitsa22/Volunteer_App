require('dotenv/config');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/db');
const authRouter = require('./routes/auth-volunteer');
const PORT = process.env.PORT || 8000;
const path = require('path');

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);


connectDB().then(() => {
  console.log("Db connected");
  app.listen(PORT, () => console.log('🚀 ~ file: index.js:11 ~ PORT:', PORT));
});
