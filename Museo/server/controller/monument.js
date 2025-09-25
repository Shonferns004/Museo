import { v2 as cloudinary } from "cloudinary";
import Monument from "../models/Monuments.js";
import FormData from "form-data";
import axios from "axios"; // Import Axios for API requests

const addMonument = async (req, res) => {
  try {
    const { name, location, description, discount,amount, openingTime, closingTime, ticketsAvailable } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    try {
      // Upload image to Cloudinary
      const imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading image to Cloudinary:", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        uploadStream.end(req.file.buffer); // End the stream with file buffer
      });
      
      const newMonument = new Monument({
        name,
        location,
        description,
        discount,
        amount,
        openingTime,
        closingTime,
        ticketsAvailable,
        imageUrl,
      });

      await newMonument.save();

      res.status(200).json({ message: "Monument saved successfully", newMonument });
      console.log("Monument saved");
    } catch (error) {
      console.error("Error processing monument:", error);
      res.status(500).json({ error: "Error processing monument" });
    }
  } catch (e) {
    console.log("Unexpected error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteMonument = async (req, res) => {
  try {
    const { id } = req.params; // Get the report ID from the request params

    const deleteAdmin = await  Monument.findByIdAndDelete(id);

    if (!deleteAdmin) {
      return res.status(404).json({ message: "Monument not found" });
    }

    res.status(200).json({ message: "Monument deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getMonument = async (req, res) => {
  const monument = await Monument.find();
  res.status(200).json(monument);
};


const getPopularAndRecentMonument = async (req, res) => {
  try {
    const monuments = await Monument.find(); // Fetch all monuments

    const popular = monuments.filter(mon => mon.discount > 0); // Example filter
    const recent = monuments.slice(-5); // Get last 5 added monuments

    res.json({
      total: monuments.length,
      available: monuments.filter(mon => mon.ticketsAvailable > 0).length,
      popular,
      recent
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export { getPopularAndRecentMonument, addMonument,deleteMonument,getMonument };
