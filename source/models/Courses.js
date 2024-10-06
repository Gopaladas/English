import mongoose, { mongo } from "mongoose";

const courseSchema = new mongoose.Schema({
    year: {
        type: String,  
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    chapters: [
        {
            chapter: {
                type: String,
                 required: true
            },
            link: {
                type: String
            }
        }
    ]
},{timestamps:true});





const Courses = mongoose.model('Courses', courseSchema);

export default Courses;
