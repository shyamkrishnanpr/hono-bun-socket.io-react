import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: process.env.MONGO_DB_NAME,
        });
        console.log("MONGODB CONNECTION SUCCESSFUL");
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR",error);
    }
}

export default connectDB;