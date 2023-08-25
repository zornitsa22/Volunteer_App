require('dotenv/config');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/db');

// Importing your routers
const projectRouter = require('./routes/projects');
const volunteerRouter = require('./routes/volunteers');
const organizationRouter = require('./routes/organizations');

// Import your routers for authentication
const authRouter = require('./routes/auth-volunteer');
const authRouterOrga = require('./routes/auth-organization');

// setting the portNumber
const PORT = process.env.PORT || 8000;

// Using the CORS Middelwares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// using the parse Middelwares for Json Format and coockies
app.use(express.json());
app.use(cookieParser());

// Mounting authentication routers
app.use('/auth', authRouter);
app.use('/authOrga', authRouterOrga);

// Mounting volunteer/project/organization routers
app.use('/api/projects', projectRouter);
app.use('/api/volunteers', volunteerRouter);
app.use('/api/organizations', organizationRouter);

// database connection and server starting
connectDB().then(() => {
  console.log("Db connected");
  app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
});

