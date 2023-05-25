require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { MongoClient, ServerApiVersion } = require("mongodb");

mongoose.set("strictQuery", false);

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

mongoose.connect(
  `mongodb+srv://${db_username}:${[
    db_password,
  ]}@diabeticapp-cluster.qbmzh8t.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("MongoDB connected successfully");
  app.listen(3001, () => {
    console.log("Listening on port 3001");
  });
});
