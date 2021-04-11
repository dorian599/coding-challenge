const express = require("express");
const router = express.Router();
const upload = require("../middlewares/csvUpload");
const csvController = require("../controllers/csvController");

module.exports = () => {
  router.post("/csv/upload", upload.single("file"), csvController.upload);
  router.get("/cars", csvController.getCars);

  return router;
};
