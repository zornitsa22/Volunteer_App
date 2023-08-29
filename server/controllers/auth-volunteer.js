const Volunteer = require('../models/volunteer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

// Function For VOLUNTEER Registration
const register = async (req, res) => {
  console.log("register calling.......")

// Check if a volunteer with the same email already exists
const existingVolunteer = await Volunteer.findOne({ email: req.body.email });
if (existingVolunteer) {
  return res.status(400).json({ message: 'Volunteer with this email already exists' });
}

 // If no existing volunteer found, proceed with registration
  try {
    const newVolunteer = await Volunteer.create({...req.body,  image: req.file.path });
    console.log("🚀 ~ file: auth-volunteer.js:10 ~ register ~ newVolunteer:", newVolunteer)
    const volunteer = { _id: newVolunteer._id, 
        volunteername: newVolunteer.volunteername, 
        email: newVolunteer.email , 
        skills: newVolunteer.skills, 
        description: newVolunteer.description,
        contactInfo:newVolunteer.contactInfo,
        image: newVolunteer.image
    };
    //user is the payload
    const accessToken = jwt.sign(volunteer, SECRET);
    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDayInMilliseconds),
      })
      .json({ message: 'volunteer created!', volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};

// Function For VOLUNTEER Login
const login = async (req, res) => {
    console.log("Login calling...........")
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Invalid login attempt' });
  }
  try {
    // Do we have the VOLUNTEER?
    const currentVolunteer = await Volunteer.findOne({ email });
    if (!currentVolunteer) {
      res.status(400).json({ message: 'Invalid login attempt' });
    } else {
      // WE HAVE A VOLUNTEER!!
      console.log('🚀 ~ file: volunteers.js:31 ~ login ~ currentVolunteer:', currentVolunteer.password, password);
      // IS THE PASSWORD MATCHING???
      const isPasswordValid = await bcrypt.compare(password, currentVolunteer.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid login attempt' });
      } else {
        // WE HAVE A VOLUNTEER and all is good
        const volunteer = {
          _id: currentVolunteer._id,
          volunteername: currentVolunteer.volunteername,
          email: currentVolunteer.email,
        };
        const accessToken = jwt.sign(volunteer, SECRET);
        res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDayInMilliseconds),
          })
          .json({ message: 'Volunteer logged in Successfully!', volunteer });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, errors: error.errors });
  }
};

// Function For VOLUNTEER Logout
const logout = (req, res) => {
    console.log("Logout calling...........")
  res.clearCookie('accessToken');
  res.json({ message: 'volunteer logged out Successfully' });
};

// Function For get logged in VOLUNTEER 
const getLoggedinVolunteer = async (req, res) => {
 console.log("@@@@@@@@££££££££££££ we are calling get loggein...")
  console.log("🚀 ~ file: auth-volunteer.js:70 ~ getLoggedinVolunteer ~ getLoggedinVolunteer:", getLoggedinVolunteer)
  try {
    const volunteer = await Volunteer.findOne({ _id: req.volunteer._id }).select('_id email volunteername');
    console.log("🚀 ~ file: auth-volunteer.js:73 ~ getLoggedinVolunteer ~ volunteer:", volunteer)
    res.json({ volunteer });
  } catch (error) {
    console.log("🚀 ~ file: auth-volunteer.js:76 ~ getLoggedinVolunteer ~ error:", error)
    res.json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedinVolunteer,
};