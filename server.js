import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const dataFolder = "./data/";
let filesList = [];

const app = express();

app.listen(3000);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public/"));

async function readDirictory() {
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
    fs.appendFileSync(dataFolder + fileName + ".txt", data, { flag: "w" });
    console.log(`Appended data to ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to append the file: ${error.message}`);
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

app.get("/", (req, res) => {
  readDirictory();
  res.render("index", { filesList });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  appendToFile(req.body["file-name"], req.body["file-content"]);
  readDirictory();
  res.render("index", { filesList });
});

app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const fileContent = readFile(filename);
  res.render("details", { filename, fileContent });
});
