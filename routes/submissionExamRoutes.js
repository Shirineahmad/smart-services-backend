const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const isAuthenticated = require("../middlewares/auth");
const { add, getSubmissionByUser,updateById} = require("../controllers/submissionExamControllers");

router.post("/create", upload.array("images", 3), isAuthenticated(["client"]), add);
router.put(
  "/update/:submissionExamId",
  isAuthenticated(["admin"]),
  updateById
);
router.get("/getByUser/:userId", getSubmissionByUser);
module.exports = router;