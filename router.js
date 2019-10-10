const express = require("express");
const path = require('path');

const app = express();
const router = express.Router();
const upload = require("./lib/middleware");
const Resize = require("./lib/resize");

router.get("/", async function (req, res) {
  await res.render("index");
});

router.post("/post", upload.single("image"), async ({ body, file }, res) => {
  const imagePath = path.join(__dirname, "/public/images");
  const fileUpload = new Resize(imagePath);
  const size = parseInt(body.size);

  if (!file) {
    res.status(422).json({
      error: "Please provide an image"
    });
  }

  if (!size) {
    res.status(422).json({
      error: "Please provide an square size"
    });
  }

  const filename = await fileUpload.save(file, size);
  await res.redirect(`/images/${filename}`);
});

module.exports = router;
