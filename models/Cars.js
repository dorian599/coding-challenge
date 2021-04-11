const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const carSchema = new mongoose.Schema({
    UUID: {
    type: String,
    trim: true,
  },
  VIN: {
    type: String,
    trim: true,
  },
  Make: {
    type: String,
    trim: true,
  },
  Model: {
    type: String,
    trim: true,
  },
  Mileage: {
    type: String,
    trim: true,
  },
  Year: {
    type: String,
    trim: true,
  },
  Price: {
    type: String,
    trim: true,
  },
  ZipCode: {
    type: String,
    trim: true,
  },
  CreateDate: {
    type: Date,
  },
  UpdateDate: {
    type: Date,
  },
  providerName: {
    type: String,
    trim: true,
  },
  
});

module.exports = mongoose.model("Car", carSchema);
