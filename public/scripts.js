function showForm(filename, content) {
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
      `;
}

function validateFilename(filesList1) {
  const filesList = JSON.parse(filesList1);
  ///check here
  return false;
}
