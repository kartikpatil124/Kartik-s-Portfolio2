/**
 * Migration Script: Fix image URLs in MongoDB
 * Changes http://localhost:10000 → https://portfolio-backend1-0061.onrender.com
 * 
 * Run once: node fix-image-urls.js
 */
require("dotenv").config();
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    projectLink: String,
    githubLink: String,
    category: [String],
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

const OLD_BASE = "http://localhost:10000";
const NEW_BASE = "https://portfolio-backend1-0061.onrender.com";

async function fixImageUrls() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        const projects = await Project.find();
        let updated = 0;

        for (const project of projects) {
            if (project.imageUrl && project.imageUrl.includes(OLD_BASE)) {
                const newUrl = project.imageUrl.replace(OLD_BASE, NEW_BASE);
                await Project.findByIdAndUpdate(project._id, { imageUrl: newUrl });
                console.log(`  ✔ ${project.title}: ${newUrl}`);
                updated++;
            }
        }

        console.log(`\n🎉 Done! Updated ${updated} out of ${projects.length} projects.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

fixImageUrls();
