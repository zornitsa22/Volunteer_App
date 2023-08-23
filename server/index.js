require('dotenv/config');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/db');


const projectRouter = require('./routes/projects');


const authRouter = require('./routes/auth-volunteer');
const authRouterOrga = require('./routes/auth-organization');


const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());




app.use('/auth', authRouter);
app.use('/authOrga', authRouterOrga);
app.use('/api/projects', projectRouter);

connectDB().then(() => {
  console.log("Db connected");
  app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
});

