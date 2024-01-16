const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const { add,getByInstitute,getByLanguage,getByLevel,getAll } = require("../controllers/examControllers");
router.post(
  "/create",
  isAuthenticated(["admin"]),
  add
);
router.get("/getByLevel/:level", getByLevel);
router.get("/getByLanguage/:language", getByLanguage);
router.get("/getAll", getAll);
router.get("/getByInstitute/:institute", getByInstitute);




module.exports = router;