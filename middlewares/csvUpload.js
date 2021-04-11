const multer = require("multer");
const path = require('path');

// ToDo add CSV mimetype filter to accept only CSV files
//
// const csvFileFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Only csv file are allowed", false);
//   }
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve() + "/uploads/csv");
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ToDo add CSV mimetype filter to accept only CSV files
//
//const uploadCsvFile = multer({ storage: storage, fileFilter: csvFileFilter });

const uploadCsvFile = multer({ storage: storage });

module.exports = uploadCsvFile;
