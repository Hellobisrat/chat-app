import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const db = async ()=>{
 
  const uri = process.env.MONGO_URI
 
    try{
      await mongoose.connect(uri)
      console.log(`DB connected`)
  } catch(error){
    console.log(error)
    process.exit(1)
  };
 
}

export default db;