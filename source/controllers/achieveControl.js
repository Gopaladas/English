import Achievement from "../models/Achievements.js";

const createAchievement = async (req, res) => {
    const { title, description, images } = req.body;

    
    if (!title || !description || !Array.isArray(description)) {
        return res.status(400).json({ message: "Title and description (array) are required." });
    }

    try {
        
        const newAchievement = new Achievement({
            title,
            description,
            images
        });

        
        await newAchievement.save();

        
        res.status(201).json({ message: "Achievement created successfully", achievement: newAchievement });
    } catch (error) {
        console.error("Error creating achievement:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const editAchievement = async (req, res) => {
    const { id, title, description, images } = req.body;

    
    if (!id) {
        return res.status(400).json({ message: "Achievement ID must be provided." });
    }

    try {
        
        const achievement = await Achievement.findById(id);

        
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found." });
        }

        
        if (title) {
            achievement.title = title;
        }

        // Update or add new items to description array if provided
        if (description && Array.isArray(description)) {
            description.forEach(item => {
                if (!achievement.description.includes(item)) {
                    achievement.description.push(item); // Add new items only
                }
            });
        }

        // Update or add new items to images array if provided
        if (images && Array.isArray(images)) {
            images.forEach(image => {
                if (!achievement.images.includes(image)) {
                    achievement.images.push(image); // Add new images only
                }
            });
        }

        
        await achievement.save();

        // Return success response
        res.status(200).json({
            message: "Achievement updated successfully",
            achievement
        });
    } catch (error) {
        console.error("Error updating achievement:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAchievements = async (req, res) => {
    try {
        // Fetch all achievements from the database
        const achievements = await Achievement.find();

        // Send the achievements as a response
        res.status(200).json({ achievements });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteAchievement = async (req, res) => {
    const { id } = req.body;

    try {
        const achieve = await Achievement.findOneAndDelete( id );
        if (!achieve) {
            return res.status(404).send("Achievement not found.");
        }

        res.status(200).send("Achievement deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};


export  {createAchievement,editAchievement, getAchievements, deleteAchievement};
