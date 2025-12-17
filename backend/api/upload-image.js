async function uploadImageToCloudinary(file) {
  try {
    const formData = new FormData();
    formData.append("image", file); // MUST be "image"

    const res = await fetch(
      "https://portfolio-backend1-0061.onrender.com/api/upload-image",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      previewImage.src = data.secure_url;
      previewImage.style.display = "block";
      imageUrlInput.value = data.secure_url;
    } else {
      alert("Image upload failed");
      console.error(data);
    }

  } catch (err) {
    console.error("Upload error:", err);
    alert("Image upload error");
  }
}
