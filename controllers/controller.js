const fs = require("fs");
const formidable = require("formidable");

const { TEXT_FILE_EXTENSION, DATA_FOULDER } = require("./helpers/constants");
const methods = require("./helpers/methods");

/** "Data Base Representave" */
let filesList = [];

async function readDirictory(dirictory) {
  try {
    filesList = fs.readdirSync(dirictory);
  } catch (error) {
    console.error(
      `Got an error trying to read the files names from the dirictory: ${error.message}`
    );
  }
}

/**Controllers */

const get_home = (req, res) => {
  readDirictory(DATA_FOULDER);
  res.render("index", { filesList });
};

const get_create = (req, res) => {
  readDirictory(DATA_FOULDER);
  res.render("create", { filesList });
};

const post_create = (req, res) => {
  methods.appendToFile(
    DATA_FOULDER + req.body["file-name"].trim() + TEXT_FILE_EXTENSION,
    req.body["file-content"]
  );
  readDirictory(DATA_FOULDER);
  res.redirect("/");
};

const get_file_details = (req, res) => {
  readDirictory(DATA_FOULDER);
  const filename = methods.removeExtension(req.params.filename);
  let fileContent = null;

  try {
    fileContent = methods.readFile(DATA_FOULDER + req.params.filename);
    res.render("details", { filename, fileContent, filesList });
  } catch (err) {
    if (err.code == "ENOENT") {
      res.redirect("/");
    }
  }
};

const edit_file = (req, res) => {
  const filename = req.params.filename + TEXT_FILE_EXTENSION;
  const newFilename = req.body["new-file-name"] + TEXT_FILE_EXTENSION;

  methods.renameFile(DATA_FOULDER + filename, DATA_FOULDER + newFilename);
  methods.appendToFile(DATA_FOULDER + newFilename, req.body["file-content"]);
  res.redirect("/files/" + newFilename);
};

const delete_file = (req, res) => {
  const filename = req.params.filename + TEXT_FILE_EXTENSION;
  methods.deleteFile(DATA_FOULDER + filename);
  readDirictory(DATA_FOULDER);
  res.redirect("/");
};

const file_upload = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(">>>>>>>>>>>>>>>>", fields);
    console.log(">>>>>>>", files.filetoupload[0].filepath);

    if (err) throw err;
    const oldpath = files.filetoupload[0].filepath;
    const newpath = DATA_FOULDER + files.filetoupload[0].originalFilename;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      console.log("File uploaded and moved!");
      res.redirect("/");
    });
  });
};

module.exports = {
  get_home,
  get_create,
  post_create,
  get_file_details,
  edit_file,
  delete_file,
  file_upload,
};
