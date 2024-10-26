import express, { response } from "express";
import fs from "fs";
import bodyParser from "body-parser";

const dataFolder = "./data/";
let filesList = [];

const app = express();

app.listen(3000);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public/"));

///controler + router // mvc
//poling app

// do we need to deal with file extensions other than txt?
async function readDirictory() {
  //midleware
  try {
    filesList = fs.readdirSync(dataFolder);
    console.log(`read files names`);
  } catch (error) {
    console.error(
      `Got an error trying to read the files names from the dirictory: ${error.message}`
    );
  }
}

async function appendToFile(fileName, data) {
  try {
    fs.appendFileSync(dataFolder + fileName, data, { flag: "w" });
    console.log(`Appended data to ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to append the file: ${error.message}`);
  }
}

async function renameFile(fileName, newFilename) {
  console.log(fileName, newFilename);

  try {
    fs.renameSync(dataFolder + fileName, dataFolder + newFilename);
    console.log(`Rename file to ${newFilename}`);
  } catch (error) {
    console.error(`Got an error trying to rename the file: ${error.message}`);
  }
}

function readFile(fileName) {
  try {
    const data = fs.readFileSync(dataFolder + fileName);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function deleteFile(fileName) {
  try {
    fs.unlinkSync(dataFolder + fileName);
    console.log(`Deleted ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf(".")) || filename;
}

app.get("/", (req, res) => {
  //root
  readDirictory();
  res.render("index", { filesList });
});

app.get("/create", (req, res) => {
  readDirictory();
  res.render("create", { filesList });
});

app.post("/create", (req, res) => {
  appendToFile(req.body["file-name"] + ".txt", req.body["file-content"]);
  readDirictory();
  res.render("index", { filesList });
});

app.get("/files/:filename", (req, res) => {
  const filename = removeExtension(req.params.filename);
  const fileContent = readFile(req.params.filename);
  res.render("details", { filename, fileContent });
});

app.post("/edit/:filename", (req, res) => {
  const filename = req.params.filename + ".txt";
  const newFilename = req.body["new-file-name"] + ".txt";

  renameFile(filename, newFilename);
  appendToFile(newFilename, req.body["file-content"]);
  res.redirect("/files/" + newFilename);
});

app.post("/delete/:filename", (req, res) => {
  const filename = req.params.filename + ".txt";
  deleteFile(filename);
  readDirictory();
  res.render("index", { filesList });
});
