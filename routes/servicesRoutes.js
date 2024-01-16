const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const isAuthenticated = require("../middlewares/auth");
const { add, getByName,getAll } = require("../controllers/sevicesControllers");

router.post(
  "/create",
  upload.array("images", 3),
  isAuthenticated(["admin"]),
  add
);
router.get(
  "/getByName/:name",
  getByName
);
router.get("/getAll", getAll);
module.exports = router;
