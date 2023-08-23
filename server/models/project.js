
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Defining the project schema
const projectSchema = mongoose.Schema(
    {
    title: { type: String, required: [true, 'Title is Required!'] },
    image: { type: String },
    description: { type: String, required: [true, 'Description is Required!'] }, 
    location: { type: String,  required: [true, 'Location is Required!'] }, 
    Skills: { type: [String], required: [true, 'Kills are Required!'] }, 
    ocurrence: { type: [String], required: [true, 'Project Timing is Required!'] },
    cause: { type: [String], required: [true, 'Cause is Required!'] },
    capacity: { type: Number, required: [true, 'Capacity is Required!'] }, 
    contactEmail: { type: String, required: [true, 'Email is Required!'] },
    volunteers: [{ type: mongoose.Types.ObjectId, ref: 'Volunteer'}],
    organizationId: {type: mongoose.Types.ObjectId, ref: 'Organization', required: [true, 'Organization_Id is Required!']},
    createdBy: { type: mongoose.Types.ObjectId, ref: 'Organization' }
    },
   
    { timestamps: true },
);

///Defining a pre-save middleware for the projectSchema
projectSchema.pre('save', async function (next) {
    try {
    const options = {
        public_id: this._id, 
        folder: process.env.CLOUDINARY_EVENTS_FOLDER_NAME,
    };
      const imagePath = this.image; 
      const res = await cloudinary.uploader.upload(imagePath, options); 
        console.log("🚀 ~ file: project.js:33 ~ res:", res)
      this.image = res.secure_url; 
      fs.unlinkSync(imagePath); 
      next(); 
    } catch (e) {
      next(e.message); 
    }
  });

const model = mongoose.model('Project', projectSchema);
module.exports = model;
