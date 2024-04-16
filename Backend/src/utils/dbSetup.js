const mysql = require("mysql");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// MySQL database configuration
const config = {
  host: "drive-view-drive-view.b.aivencloud.com",
  user,
  password,
  database: "defaultdb",
};

// Create a MySQL connection
const connection = mysql.createConnection(config);
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

// Function to create the database
function createDatabase() {
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database}`,
    (err, result) => {
      if (err) throw err;
      console.log("Database created or already exists.");
    }
  );
}

// Function to create the users table
function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      googleId VARCHAR(255) NOT NULL,
      accessToken VARCHAR(2048),
      refreshToken VARCHAR(2048),
      expiryDate DATETIME,
      UNIQUE KEY unique_googleId (googleId)
    )
  `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table "users" created or already exists.');
  });
}

// Run setup functions
function setupDatabase() {
  createUsersTable();
}

// Close the MySQL connection
function closeConnection() {
  connection.end((err) => {
    if (err) {
      return console.log("error:" + err.message);
    }
    console.log("Database connection closed.");
  });
}

// Export functions for use elsewhere if needed
module.exports = {
  setupDatabase,
  closeConnection,
};

// If running this file directly, perform setup
if (require.main === module) {
  setupDatabase();
  // Uncomment the following line to close connection automatically after setup
  // closeConnection();
}
