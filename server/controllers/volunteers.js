const Volunteer = require('../models/volunteer');
const Project = require('../models/project')

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
const updateVolunteer = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    // const updatedVolunteer= await Volunteer.findByIdAndUpdate()
    const updatedVolunteer = await Volunteer.findOneAndUpdate({ _id: id }, body, { new: true });
    console.log("🚀 ~ file: volunteer-profile.js:47 ~ updateVolunteer ~ updatedVolunteer:", updatedVolunteer)
    if (!updatedVolunteer) {
      res.status(404).json({ message: 'Volunteer Not Found' });
    }
    res.json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      const appliedProjects = await Project.find({ volunteers: volunteerIdToSearch });
      
      res.status(200).json(appliedProjects);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching projects applied by volunteer' });
  }
};

module.exports = {
//   createBook,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getProjectsAppliedByVolunteer,
};

