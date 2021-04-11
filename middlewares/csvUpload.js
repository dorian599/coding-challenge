const multer = require("multer");
const path = require('path');

const csvFileFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Only csv file are allowed", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve() + "/uploads/csv");
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadCsvFile = multer({ storage: storage, fileFilter: csvFileFilter });

module.exports = uploadCsvFile;
