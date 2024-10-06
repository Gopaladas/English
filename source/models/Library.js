import mongoose, { mongo } from "mongoose";

const librarySchema = new mongoose.Schema({
    librarytype: {
        type: String,  
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    }
},{timestamps:true});


const Library = mongoose.model('Library', librarySchema);

export default Library;
