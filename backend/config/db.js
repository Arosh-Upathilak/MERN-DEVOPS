import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const mongoDB_uri = process.env.MONGODB_URL;
    await mongoose.connect(mongoDB_uri);
    console.log('MongoDb connect successfull');
  } catch (error) {
    console.log('Error : ', error);
    process.exit(1);
  }
};

export default connectDB;
