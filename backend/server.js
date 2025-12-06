require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log("MongoDB Error ❌:", err));

// SCHEMAS
const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    tech: String,
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
const Contact = mongoose.model("Contact", contactSchema);

// Admin Login API
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid login" });
});

// GET All Projects
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// ADD Project
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Project create failed" });
  }
});

// CONTACT FORM API
app.post("/api/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Contact failed" });
  }
});

// Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
