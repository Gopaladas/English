import mongoose from "mongoose"

const connectDb=async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected succesfully`);
    }catch(e){
        console.log(`mongodb not connected error: ${e}`);
    }
}

export default connectDb;