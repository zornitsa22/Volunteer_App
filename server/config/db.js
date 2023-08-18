const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('CONNECTION', process.env.MONGODB_ATLAS_CONNECTION_STRING);
    await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING);
  } catch (error) {
    console.log('MONGODB CONNECTION ERROR', error);
    process.exit(1);
  }
};

module.exports = connectDB;
