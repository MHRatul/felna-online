require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// API route to upload image
app.post("/api/upload", upload.single("image"), (req, res) => {
  const { title, description, url } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;

  const query =
    "INSERT INTO hero_images (image, title, description, url) VALUES (?, ?, ?, ?)";
  connection.query(query, [imagePath, title, description, url], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json({ message: "Image uploaded successfully", image: imagePath });
  });
});

// API route to fetch slider data
app.get("/api/slider", (req, res) => {
  const query = "SELECT id, image, title, description, url FROM hero_images";

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching slider data" });
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
