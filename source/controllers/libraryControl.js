import mongoose from "mongoose";
import Library from "../models/Library.js";

const createLibrary = async (req, res) => {
    const { librarytype, image, title, pdf} = req.body;

    
    if (!librarytype || !image  || !title || !pdf) {
        return res.status(400).send("Fill all the required fields: librarytitle, image, title, pdf.");
    }

    try {
        
        await Library.create({ librarytype, image, title, pdf});
        res.status(201).send("Library created successfully.");
    } catch (error) {
        console.error("Error creating library:", error);
        res.status(500).send("Server error.");
    }
};




const editLibrary = async (req, res) => {
    const { id, changeLibraryType, changeImage, changeTitle, changePdf } = req.body;

    
    if (!id) {
        return res.status(400).send("ID is required to find the course.");
    }

    
    if (!changeTitle && !changeImage && !changePdf && !changeLibraryType) {
        return res.status(400).send("At least one field (changeTitle,changeLibraryType, changeImage, changePdf) must be provided for update.");
    }

    try {
       
        const library = await Library.findById(id);
        if (!library) {
            return res.status(404).send("Library not found.");
        }

        if (changeLibraryType) {
            library.librarytype = changeLibraryType;
        }
        if (changeTitle) {
            library.title = changeTitle;
        }
        if (changeImage) {
            library.image = changeImage;
        }
        if (changePdf) {
            library.pdf = changePdf;
        }
        

        
        await library.save();

       
        res.status(200).json({
            librarytype: library.librarytype,
            title: library.title,
            image: library.image,
            pdf: library.pdf,
        });
    } catch (error) {
        res.status(500).send("Server error.");
    }
};



const deleteLibrary = async (req, res) => {
    const { id } = req.body;

    try {
        const library = await Library.findOneAndDelete( id );
        if (!library) {
            return res.status(404).send("Library not found.");
        }

        res.status(200).send("Library deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};



const fetchingLibrary = async (req, res) => {
    const { librarytype } = req.body;

    
    if (!librarytype) {
        return res.status(400).send("librarytype must be provided.");
    }

    try {
       
        const library = await Library.find({ librarytype }).sort({ title: 1 });
        
        if (library.length === 0) {
            return res.status(404).send("No library found for the given librarytype.");
        }

        
        res.status(200).json(library);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};


const fetchingPdf = async (req, res) => {
    const { id } = req.body;

    // Check if id is provided
    if (!id) {
        return res.status(400).send("ID must be provided.");
    }

    try {
        
        const library = await Library.findById(id);

        if (!library) {
            return res.status(404).send("Library not found.");
        }

        
        if (!library.pdf) {
            return res.status(404).send("No PDF found for this library.");
        }

        // Set the appropriate headers for downloading the PDF
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition", `attachment; filename=course_${id}.pdf`);

        // Send the PDF content as the response
        res.send(library.pdf);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};





export { createLibrary, editLibrary, deleteLibrary, fetchingLibrary, fetchingPdf};
