const fs = require("fs");
/**Helper functions */

async function appendToFile(fileName, data) {
  try {
    fs.appendFileSync(fileName, data, { flag: "w" });
    console.log(`Appended data to ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to append the file: ${error.message}`);
  }
}

async function renameFile(fileName, newFilename) {
  try {
    fs.renameSync(fileName, newFilename);
    console.log(`Rename file to ${newFilename}`);
  } catch (error) {
    console.error(`Got an error trying to rename the file: ${error.message}`);
  }
}

function readFile(fileName) {
  try {
    const data = fs.readFileSync(fileName);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
    throw error;
  }
}

async function deleteFile(fileName) {
  try {
    fs.unlinkSync(fileName);
    console.log(`Deleted ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf(".")) || filename;
}

module.exports = {
  readFile,
  renameFile,
  removeExtension,
  appendToFile,
  deleteFile,
};
