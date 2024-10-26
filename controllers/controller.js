const fs = require("fs");

/**const */
const dataFolder = "./data/";

/** "Data Base" */
let filesList = [];

/**Helper functions */
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

function showForm(filename, content) {
  /// move to controller

  document.getElementsByClassName("content")[0].innerHTML = `
      <form action="/edit/${filename}" method="post">
          <div>
            <p>file Name:</p>
            <input type="text" name="new-file-name" value = "${filename}" required />
          </div>
          <div>
            <p><label for="file-content">Content:</label></p>
            <textarea
              id="file-content"
              name="file-content"
              rows="10"
              cols="50"
            >${content}</textarea>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <form action = '/delete/${filename}' method="post">
         <button type="submit">
            Delete File
          </button>
          </form>
        `;
}

function validateFilename(filesList1) {
  //check for common valiadation for file name.
  const filesList = JSON.parse(filesList1);
  let filename = document.getElementById("file-name-id").value;
  let filenameErr = document.getElementById("file-name-error");

  if (filesList.includes(filename + ".txt")) {
    filenameErr.innerHTML = "File already found. change the name please";
    return false;
  } else {
    filenameErr.innerHTML = "";
    return true;
  }
}

/**Controllers */

const get_home = (req, res) => {
  readDirictory();
  res.render("index", { filesList });
};

const get_create = (req, res) => {
  readDirictory();
  res.render("create", { filesList });
};

const post_create = (req, res) => {
  appendToFile(req.body["file-name"] + ".txt", req.body["file-content"]);
  readDirictory();
  res.render("index", { filesList });
};

const get_file_details = (req, res) => {
  const filename = removeExtension(req.params.filename);
  const fileContent = readFile(req.params.filename);
  res.render("details", { filename, fileContent });
};

const edit_file = (req, res) => {
  const filename = req.params.filename + ".txt";
  const newFilename = req.body["new-file-name"] + ".txt";

  renameFile(filename, newFilename);
  appendToFile(newFilename, req.body["file-content"]);
  res.redirect("/files/" + newFilename);
};

const delete_file = (req, res) => {
  const filename = req.params.filename + ".txt";
  deleteFile(filename);
  readDirictory();
  res.render("index", { filesList });
};

module.exports = {
  get_home,
  get_create,
  post_create,
  get_file_details,
  edit_file,
  delete_file,
};
