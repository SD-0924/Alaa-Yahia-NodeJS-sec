const express = require("express");

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/files/:filename", (req, res) => {
  res.render("details", { filename: "getFileNameFromURL" });
});
