const express = require("express");
const router = express.Router();
const { add,getByCountryName,getAll} = require("../controllers/visaControllers");
const isAuthenticated = require("../middlewares/auth");

router.post("/create", isAuthenticated(["admin"]), add);
router.get("/getByCountryName/:countryName", getByCountryName);
router.get("/getAll", getAll);
module.exports = router;