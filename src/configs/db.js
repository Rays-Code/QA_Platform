import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("DB connected succesfully");
    } catch(err){
        console.error("Failed to connect DB: ", err);
    } 
}

export default connectDB;