const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const authenticateVol = async (req, res, next) => {
    console.log("auth.js is started........")
  try {
    console.log('🚀 ~ file: auth.js:6 ~ authenticate ~ accessToken:', req.cookies.accessToken);
    if (req.cookies.accessToken) {
      const volunteer = await jwt.verify(req.cookies.accessToken, SECRET);
      req.volunteer = volunteer;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateVol;

