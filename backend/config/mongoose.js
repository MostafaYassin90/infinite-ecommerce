import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/infinite-Ecommerce`);
    console.log("MongoDB Connection Successful.");
  } catch (error) {
    console.log(`MongoDB Connection Failed. => ${error.message}`);
  }
};

export default connectDB;