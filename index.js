require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const http = require("http");

mongoose.set("strictQuery", false);
const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const uri = process.env.URI;
const db_username = process.env.USERNAME;
const db_password = process.env.PASSWORD;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

mongoose
  .connect(
    // `mongodb+srv://${db_username}:${[
    //   db_password,
    // ]}@diabeticapp-cluster.qbmzh8t.mongodb.net/?retryWrites=true&w=majority`,
    "mongodb+srv://ayush:ayush123@diabetic-cluster.6wulxnr.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Start the server once connected to the database
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
