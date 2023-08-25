const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const volunteerSchema = mongoose.Schema(
  {
    volunteername: { type: String, required: [true, 'volunteername is Required!'] },
    email: { type: String, unique: true, required: [true, 'email is Required!'] },
    password: {
      type: String,
      minLength: [8, 'Password Must Be 8 characters or more!'],
    //   required: [true, 'Password is Required!'],
    },
    skills:{type: [String], required: [true, 'Skill is Required!']},
    contactInfo:{type: [String], required: [true, 'contact is Required!']},
    description:{type: String, required: [true, 'Description is Required!']},
    image:{type: String},
  },
  {
    timestamps: true,
  },
);

volunteerSchema
  .virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => (this._confirmPassword = value));

volunteerSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password need to match!');
  }
  next();
});
volunteerSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 6);
    console.log('🚀 ~ file: user.js:32 ~ hashedPassword:', hashedPassword);
    console.log('PASSWORD', this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log('HASHING ERROR!!', error);
  }
});
volunteerSchema.pre('save', async function (next) {
  try {
    const options = {
      public_id: this._id,
      folder: process.env.CLOUDINARY_BOOKS_FOLDER_NAME,
    };
    const imagePath = this.image;
    const res = await cloudinary.uploader.upload(imagePath, options);
    console.log('🚀 ~ file: event.js:23 ~ res:', res);

    this.image = res.secure_url;
    fs.unlinkSync(imagePath);
    next();
  } catch (e) {
    next(e.message);
  }
});

const model = mongoose.model('Volunteer', volunteerSchema);
module.exports = model;
