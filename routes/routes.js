const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const middlewares = require("../middlewares/files_middleware");
const { render } = require("ejs");

router.get("/", controller.get_home);
router.get("/create", controller.get_create);
router.post("/create", controller.post_create);
router.post("/fileupload", controller.file_upload);
router.get("/files/:filename", controller.get_file_details);
router.post("/edit/:filename", controller.edit_file);
router.post("/delete/:filename", controller.delete_file);
router.post("/download/:filename", controller.download_file);
module.exports = router;
