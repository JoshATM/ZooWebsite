import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

/*
I need to conenct the two data bases but I run into an error if I don't use cors (replicate this error in the exam)

The issue might be related to the Cross-Origin Resource Sharing (CORS) policy.

The client-side application (React) is running on a different origin (different port) than the server-side application (Express). By default, the browser's same-origin policy blocks requests to a different origin than the one from which the current document was served.

To solve this issue, you need to enable CORS on your Express server. This can be done using the cors npm package. Here's how you can do it:

This will allow your Express server to accept cross-origin requests from your React application.

Also, ensure that your MySQL server is running and the database "zoo_database" exists. The user "root" should have the correct permissions and the password should be correct.

On the client side, make sure that the server is running on 'http://localhost:5000' when you're making the fetch request. If the server is running on a different port, you'll need to update the fetch URL accordingly.
*/

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Your MySQL password
  database: "zoo_database",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a new user
app.post("/users", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const query =
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [firstName, lastName, email, password],
    (err, results) => {
      if (err) {
        console.error("Error inserting user: " + err.stack);
        res.status(500).send("Error inserting user: " + err.message); // Send the error message in the response
        return;
      }
      res.status(201).send("User created successfully");
    }
  );
});
// Get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting users: " + err.stack);
      res.status(500).send("Error getting users");
      return;
    }
    res.status(200).json(results);
  });
});
