const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_ORGA;
const authenticate = async (req, res, next) => {
    console.log("authOrga.js is started........")
  try {
    console.log('🚀 ~ file: auth-orga.js:6 ~ authenticate ~ accessToken:', req.cookies.accessToken);
    if (req.cookies.accessToken) {
      const organization = await jwt.verify(req.cookies.accessToken, SECRET);
      console.log("🚀 ~ file: authOrga.js:9 ~ authenticate ~ organization:", organization)
      req.organization = organization;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
