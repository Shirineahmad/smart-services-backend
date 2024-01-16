const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const isAuthenticated = require("../middlewares/auth");
const { add ,getAll} = require("../controllers/howToPayControllers");
router.post(
  "/create",
  upload.array("images", 1),
  isAuthenticated(["admin"]),
  add
);
router.get(
  "/getAll",getAll
);
module.exports = router;