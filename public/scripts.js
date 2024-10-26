function isValidWindowsFilename(filename) {
  const rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
  const rg2 = /^\./; // cannot start with dot (.)
  const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
  return rg1.test(filename) && !rg2.test(filename) && !rg3.test(filename);
}

function validateFilename(filesList1, edit = false) {
  const filesList = JSON.parse(filesList1);
  let filename = document.getElementById("file-name-id").value.trim();
  let filenameErr = document.getElementById("file-name-error");
  if (filename === "") {
    filenameErr.innerHTML = "File Name can't be empty. change the name please";
    return false;
  }
  if (!isValidWindowsFilename(filename)) {
    filenameErr.innerHTML =
      "File Name is using forbidding characters. change the name please";
    return false;
  }
  if (!edit && filesList.includes(filename + ".txt")) {
    filenameErr.innerHTML = "File already found. change the name please";
    return false;
  } else {
    filenameErr.innerHTML = "";
    return true;
  }
}

function showForm() {
  const x = document.getElementsByClassName("content-form")[0];
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
