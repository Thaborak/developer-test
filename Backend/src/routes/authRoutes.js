const express = require("express");
const router = express.Router();

const {
  redirectToGoogle,
  handleGoogleCallback,
} = require("../services/googleDriveService");

router.get("/google", redirectToGoogle);
router.get("/oauth2callback", handleGoogleCallback);

module.exports = router;
