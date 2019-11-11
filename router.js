const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
const router = express.Router();
const upload = require("./lib/middleware");
const Resize = require("./lib/resize");
const User = require("./lib/user");
const Image = require("./lib/image");

router.get("/upload", async (_, res) => {
  await res.render("index");
});

router.post("/upload", upload.single("image"), async ({ body, file }, res) => {
  const imagePath = path.join(__dirname, "/public/images");
  const fileUpload = new Resize(imagePath);
  const size = parseInt(body.size);
  const caption = body.caption;

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

  const filename = await fileUpload.save(file, size, caption);
  await res.redirect(`/images/${filename}.jpg`);
});

router.get("/login", async (_, res) => {
  await res.render("login");
});

router.post("/login", async ({ body }, res) => {
  var user = new User(body.email, body.password);

  if (user.find()) {
    await res.render("index");
  } else {
    await res.sendStatus(401);
  }
});

router.get("/create", async (_, res) => {
  await res.render("create");
});

router.post("/create", async ({ body }, res) => {
  new User(body.email, body.password).create();
  await res.render("login");
});

router.get("/images", async (_, res) => {
  Image.all(async (images) => {
    await res.render("images", { images: images });
  });
});

module.exports = router;
