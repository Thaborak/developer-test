const mysql = require("mysql");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "drive-view-drive-view.b.aivencloud.com",
  user,
  password,
  database: "defaultdb",
});

module.exports = pool;
