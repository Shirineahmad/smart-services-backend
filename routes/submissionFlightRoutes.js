const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for files
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit if needed
});
const isAuthenticated = require("../middlewares/auth");
const {
  add
} = require("../controllers/submissionFlightControllers");

router.post(
  "/create",
  upload.array("passport"),
  isAuthenticated(["client"]),
  add
);





module.exports = router;
