const express = require("express");
const router = express.Router();
const {
  listFiles,
  previewFile,
  downloadFile,
} = require("../services/googleDriveService");

router.get("/", listFiles);
router.get("/preview/:fileId", previewFile);
router.get("/download/:fileId", downloadFile);

module.exports = router;
