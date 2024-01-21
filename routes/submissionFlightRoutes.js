const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const isAuthenticated = require("../middlewares/auth");
const {
  add,
  getSubmissionByUser,
  updateById,
  getAll,
} = require("../controllers/submissionFlightControllers");

router.post(
  "/create",
  upload.array("passport"),
  isAuthenticated(["client"]),
  add
);
router.get("/getByUser/:userId", getSubmissionByUser);
router.put(
  "/update/:submissionFlightId",
  isAuthenticated(["admin"]),
  updateById
);

router.get("/getAll", getAll);

module.exports = router;
