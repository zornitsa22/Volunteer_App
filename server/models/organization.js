const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const organizationSchema = mongoose.Schema(
  {
    organizationName: { type: String, required: [true, 'organizationName is Required!'] },
    email: { type: String, unique: true, required: [true, 'email is Required!'] },
    password: {
      type: String,
      minLength: [8, 'Password Must Be 8 characters or more!'],
    //   required: [true, 'Password is Required!'],
    },
    description: {type: String, required: [true, 'Description is Required!']},
    contactInfo:{type: [String], required: [true, 'contact is Required!']},
    // streetstreet_no: {type: String, required: [true, 'streetstreet_no is Required!']},
    // zipcode: {type: String, required: [true, 'zipcode is Required!']},
    // city: {type: String, required: [true, 'city is Required!']},
    // projects:   [{type: mongoose.Types.ObjectId, ref: projects}],
    website: {type: String, required: [true, 'website is Required!']},
    image:{type: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    projects: [{ type: mongoose.Types.ObjectId, ref: 'Project'}],
    volunteers: [{ type: mongoose.Types.ObjectId, ref: 'Volunteer'}],
    contactInfo:{type: String, required: [true, 'Description is Required!']}, 
    decision: { type: String, enum: ['Pending', 'Accepted', 'Denied'], default: 'Pending' }
  },
  
  {
    timestamps: true,
  },
);

organizationSchema
  .virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => (this._confirmPassword = value));

  organizationSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password need to match!');
  }
  next();
});

organizationSchema.pre('save', async function (next) {
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

const model = mongoose.model('Organization', organizationSchema);
module.exports = model;
