import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now  // Automatically set the current date when created
    }
}, { timestamps: false });  // Disable default timestamps, since you're using custom fields


const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
