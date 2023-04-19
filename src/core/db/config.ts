import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(String(process.env.DB_CNN));
    console.log('DB online')
  } catch (error) {
    console.error(error);
    throw new Error("Error init DB, see logs");
  }
};

export default dbConnection;
