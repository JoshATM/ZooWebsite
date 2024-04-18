const express = require('express');
const mysql = require('mysql');

const app = express();

// Connect to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'zoo_database'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Create table for storing user information
const createUserTable = `
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
)
`;

// Create table for storing card payments
const createCardPaymentsTable = `
CREATE TABLE IF NOT EXISTS CardPayments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT,
  Amount DECIMAL(10, 2),
  FOREIGN KEY (UserId) REFERENCES Users(id)
)
`;

// Create table for storing ticket bookings
const createTicketBookingsTable = `
CREATE TABLE IF NOT EXISTS TicketBookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT,
  TimePurchased DATETIME,
  Adults INT,
  Seniors INT,
  Children INT,
  Price DECIMAL(10, 2),
  FOREIGN KEY (UserId) REFERENCES Users(id)
)
`;

// Create table for storing hotel bookings
const createHotelBookingsTable = `
CREATE TABLE IF NOT EXISTS HotelBookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT,
  Rooms INT,
  NumPeople INT,
  Price DECIMAL(10, 2),
  FOREIGN KEY (UserId) REFERENCES Users(id)
)
`;

// Execute table creation queries
connection.query(createUserTable, (err, results) => {
  if (err) throw err;
  console.log('Users table created');
});

connection.query(createCardPaymentsTable, (err, results) => {
  if (err) throw err;
  console.log('CardPayments table created');
});

connection.query(createTicketBookingsTable, (err, results) => {
  if (err) throw err;
  console.log('TicketBookings table created');
});

connection.query(createHotelBookingsTable, (err, results) => {
  if (err) throw err;
  console.log('HotelBookings table created');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
