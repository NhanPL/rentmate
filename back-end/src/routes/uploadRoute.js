const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const router = express.Router();
const cloudinary = require("../cloudinary.js");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          {
            folder: "rentmate",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      res.json({ message: "File deleted successfully" });
    } else {
      res.status(400).json({ error: "Delete failed", result });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:public_id", upload.single("file"), async (req, res) => {
  try {
    const { public_id } = req.params;

    // Xóa ảnh cũ
    await cloudinary.uploader.destroy(public_id);

    // Upload ảnh mới
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "rentmate",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.json({
      message: "File updated successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
