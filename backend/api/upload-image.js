import { v2 as cloudinary } from 'cloudinary';

app.post("/api/upload-image", async (req, res) => {
    try {
        const file = req.body.file; // Base64 or file path

        const uploadRes = await cloudinary.uploader.upload(file, {
            upload_preset: "portfolio_upload"
        });

        res.json({
            success: true,
            imageUrl: uploadRes.secure_url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Upload failed" });
    }
});
