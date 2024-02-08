import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const conn= await mongoose.connect('mongodb+srv://apipractice')
        console.log(`mongo db connected ${conn.connection.host}`);
    } catch (error) {
        console.log('connection failed',error);
        process.exit(1);
    }
}
export {connectDB} 
