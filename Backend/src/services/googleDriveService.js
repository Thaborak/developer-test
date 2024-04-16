const { oAuth2Client } = require("../config/oauth");
const { google } = require("googleapis");
const { getStoredTokens, saveTokens } = require("./tokenService");
const drive = google.drive({ version: "v3", auth: oAuth2Client });

// Redirect to Google's OAuth 2.0 server
function redirectToGoogle(req, res) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive", "profile"],
  });
  res.redirect(authUrl);
}

// Google OAuth 2.0 callback
async function handleGoogleCallback(req, res) {
  try {
    const { tokens } = await oAuth2Client.getToken(req.query.code);
    oAuth2Client.setCredentials(tokens);
    saveTokens(tokens);
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).send("Authentication failed");
  }
  res.redirect(
    `${process.env.REACT_BASE_URL}/oauthcallback` ||
      "http://localhost:3000/oauthcallback"
  ); // Redirect to frontend files page
}

// Get files from Google Drive
async function listFiles(req, res) {
  try {
    const tokens = await getStoredTokens();
    if (!tokens) {
      res.status(401).send("Authentication required.");
      return;
    }
    oAuth2Client.setCredentials(tokens);

    // Rest of your existing code
  } catch (error) {
    console.error("Failed to retrieve files", error);
    res.status(500).send("Failed to retrieve files");
  }
  try {
    const tokens = getStoredTokens();
    if (!tokens) {
      return res.status(401).send("Authentication required.");
    }
    oAuth2Client.setCredentials(tokens);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const result = await drive.files.list({
      pageSize: 10,
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, size, owners, shared, webViewLink, thumbnailLink)",
    });

    res.json(result.data.files);
  } catch (error) {
    console.error("Failed to retrieve files", error);
    res.status(500).send("Failed to retrieve files");
  }
}

// Preview a file
async function previewFile(req, res) {
  const tokens = getStoredTokens();
  if (!tokens) {
    return res.status(401).send("Authentication required.");
  }
  oAuth2Client.setCredentials(tokens);

  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  try {
    // Retrieve the file's metadata to get the webViewLink if it's a Google Doc
    const fileMetadata = await drive.files.get({
      fileId: req.params.fileId,
      fields: "webViewLink, mimeType",
    });

    if (fileMetadata.data.mimeType.includes("google-apps")) {
      // If it's a Google Doc, redirect to the webViewLink
      res.redirect(fileMetadata.data.webViewLink);
    } else {
      // If it's not a Google Doc, try to stream the file content
      const response = await drive.files.get(
        {
          fileId: req.params.fileId,
          alt: "media",
        },
        {
          responseType: "stream",
        }
      );

      response.data
        .on("end", () => {
          console.log("Done streaming file.");
        })
        .on("error", (err) => {
          console.error("Error streaming file.", err);
          res.status(500).send("Error streaming file.");
        })
        .pipe(res);
    }
  } catch (error) {
    console.error("Failed to retrieve file", error);
    res.status(500).send("Failed to retrieve file");
  }
}

// Download a file
async function downloadFile(req, res) {
  const tokens = getStoredTokens();
  if (!tokens) {
    return res.status(401).send("Authentication required.");
  }
  oAuth2Client.setCredentials(tokens);

  try {
    const fileMetadata = await drive.files.get({
      fileId: req.params.fileId,
      fields: "name, mimeType",
    });

    const response = await drive.files.get(
      {
        fileId: req.params.fileId,
        alt: "media",
      },
      {
        responseType: "stream",
      }
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileMetadata.data.name}"`
    );
    response.data
      .on("end", () => {
        console.log("Done downloading file.");
      })
      .on("error", (err) => {
        console.error("Error downloading file.", err);
        res.status(500).send("Error downloading file.");
      })
      .pipe(res);
  } catch (error) {
    console.error("Failed to download file", error);
    res.status(500).send("Failed to download file");
  }
}

module.exports = {
  redirectToGoogle,
  handleGoogleCallback,
  listFiles,
  previewFile,
  downloadFile,
};
