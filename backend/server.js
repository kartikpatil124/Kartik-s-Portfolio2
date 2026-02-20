require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");



const app = express();

// ================= CORS FIX ==================
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

// ================= UPLOADS FOLDER ==================
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use("/uploads", express.static(uploadsDir));

// ================= MULTER CONFIG ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  }
});

// ================= MongoDB Connection ==================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log("MongoDB Error ❌:", err));


// ================== SCHEMAS (UPDATED TO MATCH FRONTEND) ==================
const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    projectLink: String,
    githubLink: String,
    category: [String],     // category MUST be array for frontend
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
const Contact = mongoose.model("Contact", contactSchema);


// ================== ADMIN LOGIN ==================
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid login" });
});


// ================== GET PROJECTS ==================
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Cannot load projects" });
  }
});


// ================== ADD PROJECT ==================
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      projectLink: req.body.projectLink,
      githubLink: req.body.githubLink,
      category: req.body.category || []
    });

    const saved = await project.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Project create failed" });
  }
});


// ================== DELETE PROJECT ==================
app.delete("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// ================== CONTACT FORM SAVE ==================
app.post("/api/contacts", async (req, res) => {
  try {
    const saved = await new Contact(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Contact failed" });
  }
});


// ================== GET ALL CONTACT MESSAGES ==================
app.get("/api/contacts", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Cannot load messages" });
  }
});


// ================== UPDATE PROJECT ==================
app.put("/api/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        projectLink: req.body.projectLink,
        githubLink: req.body.githubLink,
        category: req.body.category || []
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


// ================== MARK MESSAGE AS READ ==================
app.put("/api/contacts/:id/read", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


// ================== DELETE CONTACT MESSAGE ==================
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// ================== UPLOAD IMAGE ==================
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ success: true, secure_url: imageUrl, url: imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});


// ================== SERVER START ==================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

