const Volunteer = require('../models/volunteer');
const Project = require('../models/project');
const cloudinary = require('../config/cloudinary');


const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find() //.populate('createdBy', 'volunteername email');
    console.log("🚀 ~ file: volunteer-profile.js:17 ~ getAllVolunteers ~ volunteers:", volunteers)
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};
const getVolunteerById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    // await Volunteer.findById(id)
    const volunteers = await Volunteer.find({ _id: id }) //.populate('createdBy', 'volunteername email');
    console.log("🚀 ~ file: volunteer-profile.js:30 ~ getVolunteerById ~ volunteers:", volunteers)
    if (volunteers.length === 0) {
      res.status(404).json({ message: 'Volunteer Not Found' });
    }
    res.json(volunteers[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updating an existing Project
const updateVolunteer = async (req, res) => {
  console.log("update volunteer is calling...")
  try {

    // Handling the file upload first using multer and cloudinary
    const uploadedFile = await cloudinary.uploader.upload(req.file.path);

    // Extracting the secure URLs of the uploaded files
    const imageUrl = uploadedFile.secure_url;

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        //req.file.path,
       {
        new: true,
       });
    console.log("🚀 ~ file: volunteers.js:40 ~ updateVolunteer ~ updatedVolunteer:", updatedVolunteer)
    // Adding the image URLs to the updated projectand saving the update
    updatedVolunteer.image = imageUrl;
  
  if(!updatedVolunteer) {
      res.status(404).json({Error: 'updatedVolunteer not Found!'})
  }
  res.status(202).json(updatedVolunteer)
  } catch(error) {
  console.log("🚀 ~ file: volunteers.js:45 ~ updateVolunteer ~ error:", error)
  res.status(500).json({Error:'Error updating volunteer'})  
  }
}; 

const deleteVolunteer = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    // const deletedVolunteer = await Volunteer.findByIdAndDelete()
    const deletedVolunteer = await Volunteer.findOneAndDelete({ _id: id });
    console.log("🚀 ~ file: volunteer-profile.js:63 ~ deleteVolunteer ~ deletedVolunteer:", deletedVolunteer)
    if (!deletedVolunteer) {
      res.status(404).json({ message: 'Volunteer Not Found' });
    }
    res.json(deletedVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Getting all projects applied for by a specific volunteer (My projects)
const getProjectsAppliedByVolunteer = async (req, res) => {
  try {

      const volunteerIdToSearch = req.params.id; 
      
      // Finding all projects where the volunteer's ID is in the 'volunteers' array
      const appliedProjects = await Project.find({ volunteers: volunteerIdToSearch })
      .populate({
        path: 'volunteers',
        model: 'Volunteer',
        select: 'decision status', 
      });
      
      res.status(200).json(appliedProjects);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching projects applied by volunteer' });
  }
};

// Function For VOLUNTEER Profile 
// Function For get logged in VOLUNTEER 
const getLoggedinVolunteer = async (req, res) => {
  console.log(" we are calling get loggein...")
   console.log("🚀 ~ file: auth-volunteer.js:70 ~ getLoggedinVolunteer ~ getLoggedinVolunteer:", getLoggedinVolunteer)
   try {
     const volunteer = await Volunteer.findOne({ _id: req.volunteer._id }).select('_id email volunteername skills contactInfo description image');
     console.log("🚀 ~ file: auth-volunteer.js:73 ~ getLoggedinVolunteer ~ volunteer:", volunteer)
     res.json({ volunteer });
   } catch (error) {
     console.log("🚀 ~ file: auth-volunteer.js:76 ~ getLoggedinVolunteer ~ error:", error)
     res.json({ message: error.message });
   }
 };

 // Function to update the decision for a volunteer
const updateVolunteerDecision = async (req, res) => {
  const { decision } = req.body; // Should be 'Accepted' or 'Denied'
  const volunteerId = req.params.id;

  try {
      const updatedVolunteer = await Volunteer.findByIdAndUpdate(
          volunteerId,
          { decision },
          { new: true }
      );

      if (!updatedVolunteer) {
          return res.status(404).json({ message: 'Volunteer not found' });
      }

      res.status(200).json({ message: 'Volunteer decision updated', volunteer: updatedVolunteer });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating volunteer decision' });
  }
};


//  updating the volunteer status status

const updateVolunteerStatus = async (req, res) => {
  const { decision } = req.body; // Should be 'Accepted' or 'Denied'
  const volunteerId = req.params.volunteer._id

  try {
      const volunteer = await Volunteer.findById(volunteerId);

      if (!volunteer) {
          return res.status(404).json({ message: 'Volunteer not found' });
      }

      // Update the volunteer's status based on the decision
      if (decision === 'Accepted') {
          volunteer.status = 'Accepted';
      } else if (decision === 'Denied') {
          volunteer.status = 'Denied';
      }

      await volunteer.save(); // Save the updated volunteer status

      res.status(200).json({ message: 'Volunteer status updated', volunteer });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating volunteer status' });
  }
};


module.exports = {
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getProjectsAppliedByVolunteer,
  getLoggedinVolunteer,
  updateVolunteerDecision,
  updateVolunteerStatus
};

