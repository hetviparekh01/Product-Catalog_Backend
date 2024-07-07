import config from 'config';
import mongoose from 'mongoose';
export const connectDB=async ()=>{
    return await mongoose.connect(config.get("DB_URL"))
}