const express = require("express");
const path = require('path');

const app = express();
const router = express.Router();
const upload = require("./lib/middleware");
const Resize = require("./lib/resize");

router.get("/", async function (req, res) {
  await res.render("index");
});

router.post("/post", upload.single("image"), async (req, res) => {
  const imagePath = path.join(__dirname, "/public/images");
  const fileUpload = new Resize(imagePath);

  if (!req.file) {
    res.status(401).json({
      error: "Please provide an image"
    });
  }

  const filename = await fileUpload.save(req.file.buffer);
  await res.redirect(`/images/${filename}`);
});

module.exports = router;
