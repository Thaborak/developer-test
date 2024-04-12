const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Function to read stored tokens
function getStoredTokens() {
  try {
    const tokenData = fs.readFileSync("tokens.json");
    return JSON.parse(tokenData);
  } catch (error) {
    return null;
  }
}

// Function to store tokens
function saveTokens(tokens) {
  fs.writeFileSync("tokens.json", JSON.stringify(tokens));
}

// Redirect to Google's OAuth 2.0 server
app.get("/auth/google", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });
  res.redirect(authUrl);
});

// Google OAuth 2.0 callback
app.get("/oauth2callback", async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.query.code);
    oAuth2Client.setCredentials(tokens);
    console.log(tokens);
    saveTokens(tokens);
    res.redirect("http://localhost:3000/files"); // Redirect to frontend files page
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).send("Authentication failed");
  }
});

// Get files from Google Drive
app.get("/files", async (req, res) => {
  try {
    const tokens = getStoredTokens();
    if (!tokens) {
      return res.status(401).send("Authentication required.");
    }
    oAuth2Client.setCredentials(tokens);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const result = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    res.json(result.data.files);
  } catch (error) {
    console.error("Failed to retrieve files", error);
    res.status(500).send("Failed to retrieve files");
  }
});

// Specify the port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
