const express = require("express");
const app = express();

// Express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./models/Cars");

const router = require("./routes");

app.use("/api/", router());

module.exports = app;
