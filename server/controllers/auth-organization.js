const Organization = require('../models/organization');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

// Function For Organization Registration
const register = async (req, res) => {
  try {
    const newOrganization = await Organization.create(req.body);
    console.log("🚀 ~ file: auth-organization.js:11 ~ register ~ newOrganization:", newOrganization)
    const organization = { _id: newOrganization._id, 
        organizationName: newOrganization.organizationName, 
        email: newOrganization.email, 
        contactInfo : newOrganization.contactInfo,
        description : newOrganization.description,
    
        // streetstreet_no : newOrganization.streetstreet_no,
        // zipcode : newOrganization.zipcode,
        // city : newOrganization.city,
        // projects : newOrganization.projects,
        logo: newOrganization.profileImage,
        website: newOrganization.website,
    };
    //organization is the payload
    const accessToken = jwt.sign(organization, SECRET);
    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDayInMilliseconds),
      })
      .json({ message: 'organization created!', organization });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};

// Function For ORGANIZATION Login
const login = async (req, res) => {
    console.log("Login calling...........")
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Invalid login attempt' });
  }
  try {
    // Do we have the ORGANIZATION?
    const currentOrganization = await Organization.findOne({ email });
   
    if (!currentOrganization) {
      res.status(400).json({ message: 'Invalid login attempt' });
    } else {
      // WE HAVE A ORGANIZATION!!
      console.log("🚀 ~ file: auth-organization.js:41 ~ login ~ currentOrganization:", currentOrganization.password, password);
      
      // IS THE PASSWORD MATCHING???
      const isPasswordValid = await bcrypt.compare(password, currentOrganization.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid login attempt' });
      } else {
        // WE HAVE A Organization and all is good
        const organization = {
          _id: currentOrganization._id,
          organizationName: currentOrganization.organizationName,
          email: currentOrganization.email,
        };
        const accessToken = jwt.sign(organization, SECRET);
        res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDayInMilliseconds),
          })
          .json({ message: 'Organization logged in Successfully!', organization });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, errors: error.errors });
  }
};

// Function For Organization Logout
const logout = (req, res) => {
    console.log("Logout calling...........")
  res.clearCookie('accessToken');
  res.json({ message: 'Organization logged out Successfully' });
};

// Function For get logged in Organization:::
const getLoggedinOrganization = async (req, res) => {
    console.log("@@@@@@@@££££££££££££ we are calling get loggein...")
    console.log("🚀 ~ file: auth-organization.js:90 getLoggedinOrganization ~  req:", req.organization);
  try {
    const organization = await Organization.findOne({ _id: req.organization._id }).select('_id email organizationName');
    console.log("🚀 ~ file: auth-organization.js:87 ~ getLoggedinOrganization ~ organization:", organization)
    res.json({ organization });
  } catch (error) {
    console.log("🚀 ~ file: auth-organization.js:90 ~ getLoggedinOrganization ~ error:", error)
    res.json({ message: error.message });
  }
};


module.exports = {
  register,
  login,
  logout,
  getLoggedinOrganization,
};
