import express from "express";
import mysql from "mysql";

const app = express();

// Create connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zoosql",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database");
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("Success!");
});

const port = 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
