const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/", router);

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server running on ${port}. Visit localhost:3000/upload. Ready for images...`);
});
