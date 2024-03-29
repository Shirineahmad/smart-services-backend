const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");


const {
  register,
  getByID,
  getAll,
  deleteById,
  update,
  login,
  sendResetEmail,
  resetPassword,
} = require("../controllers/userControllers");

router.post("/login", login);
router.post("/register", register);
router.put("/update/:ID", update);
router.get("/getById/:ID", getByID);
router.get("/getAll", getAll);
router.post("/send-reset-email", sendResetEmail);
router.post("/reset-password", resetPassword);
router.delete("/delete/:ID", isAuthenticated(["admin"]), deleteById);


module.exports = router;