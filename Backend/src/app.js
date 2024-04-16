const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./utils/corsOptions");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(cors(corsOptions));
app.use("/", authRoutes);
app.use("/files", fileRoutes);

module.exports = app;
