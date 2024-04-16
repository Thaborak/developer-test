const fs = require("fs");
const path = require("path");

// Tokens file path
const TOKEN_PATH = path.join(__dirname, "..", "..", "tokens.json");

// Function to read stored tokens
function getStoredTokens() {
  try {
    const tokenData = fs.readFileSync(TOKEN_PATH);
    return JSON.parse(tokenData);
  } catch (error) {
    console.error("Failed to read token file:", error);
    return null;
  }
}

// Function to store tokens
function saveTokens(tokens) {
  try {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log("Tokens saved successfully");
  } catch (error) {
    console.error("Failed to save token file:", error);
  }
}

module.exports = { getStoredTokens, saveTokens };
