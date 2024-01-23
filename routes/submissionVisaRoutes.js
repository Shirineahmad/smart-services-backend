const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 megabytes
});

const isAuthenticated = require("../middlewares/auth");
const {
  add,
  getSubmissionByUser,
  updateById,
  getAll,
} = require("../controllers/submissionVisaControllers");

router.post(
  "/create",
  upload.array("documents"),
  isAuthenticated(["client"]),
  add
);
router.get("/getByUser/:userId", getSubmissionByUser);
router.put(
  "/update/:submissionVisaId",
  isAuthenticated(["admin"]),
  updateById
);

router.get("/getAll", getAll);
// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.message);
    return res.status(400).json({
      success: false,
      message: "Multer error",
      error: err.message,
    });
  }
  next(err);
});


module.exports = router;
