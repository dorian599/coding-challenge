const path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const slug = require("slug");
const _ = require("lodash");

const mongoose = require("mongoose");
const Car = mongoose.model("Car");

// Only this columns will be picked from the CSV
const allowedColumns = [
  "UUID",
  "VIN",
  "Make",
  "Model",
  "Mileage",
  "Year",
  "Price",
  "ZipCode",
  "CreateDate",
  "UpdateDate",
];

exports.upload = async (req, res) => {
  const providerName = req.body.provider
    ? slug(req.body.provider)
    : "unknown-provider";

  try {
    if (req.file == undefined) {
      return res.status(400).json({
        message: "Please upload a CSV file to proceed",
        successfull: false,
      });
    }

    let cars = [];
    let filePath = path.resolve() + "/uploads/csv/" + req.file.filename;

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        let carData = _.pick(row, allowedColumns); // Allowed columns are selected
        carData.providerName = providerName; // Provider name is assigned
        cars.push(carData);
      })
      .on("end", () => {
        Car.insertMany(cars);
        res
          .status(201)
          .json({ message: "CSV File Uploaded", successfull: true });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Could not upload the CSV file with name: ${req.file.originalname}`,
      successfull: false,
    });
  }
};

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  const message = cars.length === 0 ? "No cars" : "List of cars" ;
  const statusCode = cars.length === 0 ? 209 : 200 ;
  res.status(statusCode).json({ message: message, successfull: true, data: cars });
};
