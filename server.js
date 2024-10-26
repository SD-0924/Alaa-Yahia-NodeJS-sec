const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routes = require("./routes/routes");

app.listen(3000);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public/"));

app.use(routes);

app.use((req, res) => {
  res.redirect("/");
});
