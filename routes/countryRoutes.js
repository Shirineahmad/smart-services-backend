const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const { add, getByName } = require("../controllers/countryControllers");

router.post("/create", isAuthenticated(["admin"]), add);

router.get("/getByName/:countryName", getByName);
module.exports = router;
