const express = require("express");
const app = express();
const db = require("./config/db");

// Express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const router = require("./routes");

app.use("/api/", router());

// Port to spin up the server
const port = process.env.PORT || 3000;

// Spin up an in-memory DB (mongodb-memory-server)
db.dbConnect();

// Spin up the the server
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
