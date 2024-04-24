import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // The exact origin of the client-side application
    credentials: true, // Allow credentials
  })
);

// Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zoo_database",
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// Register user
app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const query =
    "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
  db.query(query, [firstName, lastName, email, password], (err, results) => {
    if (err) {
      console.error("Error registering user: " + err.stack);
      res.status(500).send("Error registering user");
      return;
    }

    res.status(200).send("User registered successfully");
  });
});

// Login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error logging in: " + err.stack);
      res.status(500).send("Error logging in");
      return;
    }

    if (results.length === 0) {
      res.status(401).send("Invalid email or password");
      return;
    }

    res.status(200).send("Login successful");
  });
});

// Logout user
app.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.status(200).send("Logged out");
});
