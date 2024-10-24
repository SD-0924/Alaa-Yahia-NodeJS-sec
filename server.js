import express from "express";
import fs from "fs";
const dataFolder = "./data";
let filesList = [];

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

fs.readdir(dataFolder, (err, data) => {
  if (err) {
    throw err;
  }
  data.forEach((file) => {
    filesList.push(file);
  });
});

app.get("/", (req, res) => {
  res.render("index", { filesList });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/files/:filename", (req, res) => {
  res.render("details", { filename: "getFileNameFromURL" });
});
