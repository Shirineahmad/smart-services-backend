const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const {
  add,

} = require("../controllers/countryControllers");

router.post("/create", isAuthenticated(["admin"]), add);


module.exports = router;