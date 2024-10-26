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

  console.log("jdfhklfdhhhhhhhhhhhh", filename);
  if (filesList.includes(filename + ".txt")) {
    filenameErr.innerHTML = "File already found. change the name please";
    return false;
  } else {
    filenameErr.innerHTML = "";
    return true;
  }
}
