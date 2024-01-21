const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 megabytes
});

const isAuthenticated = require("../middlewares/auth");
const { add } = require("../controllers/submissionVisaControllers");

router.post(
  "/create",
  upload.array("documents"),
  isAuthenticated(["client"]),
  add
);

module.exports = router;
