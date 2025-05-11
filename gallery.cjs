// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");

const app = express();
const PORT = 5000; // backend port

app.use(cors());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

// Gallery route
app.get("/api/gallery", async (req, res) => {
  const { folder } = req.query;

  if (!folder) {
    return res.status(400).json({ error: "Folder name is required" });
  }

  try {
    const result = await cloudinary.search
      .expression(`folder=${folder}`)
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const images = result.resources.map((img) => ({
      src: img.secure_url,
      alt: img.public_id.split("/").pop().replace(/[-_]/g, " "),
      category: folder,
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error("Cloudinary error:", error);
    res.status(500).json({ error: "Failed to fetch images from Cloudinary" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
