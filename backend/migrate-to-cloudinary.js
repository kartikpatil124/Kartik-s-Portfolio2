/**
 * Migration Script: Upload local images to Cloudinary & update MongoDB
 * 
 * Run once after setting CLOUDINARY_* env vars:
 *   node migrate-to-cloudinary.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    projectLink: String,
    githubLink: String,
    category: [String],
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
const uploadsDir = path.join(__dirname, "uploads");

async function migrate() {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            console.error("❌ CLOUDINARY_CLOUD_NAME not set in .env. Add your Cloudinary credentials first.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        const projects = await Project.find();
        let updated = 0;

        for (const project of projects) {
            if (!project.imageUrl) continue;

            // Extract filename from URL
            const filename = project.imageUrl.split("/uploads/")[1];
            if (!filename) {
                console.log(`  ⏭ ${project.title}: no /uploads/ path found, skipping`);
                continue;
            }

            const localPath = path.join(uploadsDir, filename);

            // Check if local file exists
            if (!fs.existsSync(localPath)) {
                console.log(`  ⚠ ${project.title}: local file not found (${filename}), skipping`);
                continue;
            }

            // Upload to Cloudinary
            console.log(`  ⬆ Uploading ${project.title}...`);
            const result = await cloudinary.uploader.upload(localPath, {
                folder: "portfolio-projects",
                transformation: [{ width: 800, height: 500, crop: "limit", quality: "auto" }],
            });

            // Update MongoDB with Cloudinary URL
            await Project.findByIdAndUpdate(project._id, { imageUrl: result.secure_url });
            console.log(`  ✔ ${project.title}: ${result.secure_url}`);
            updated++;
        }

        console.log(`\n🎉 Done! Migrated ${updated} out of ${projects.length} projects to Cloudinary.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

migrate();
