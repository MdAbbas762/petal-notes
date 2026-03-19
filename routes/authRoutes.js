const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { showRegisterPage, register, showLoginPage, login, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/register", showRegisterPage);
router.post("/register", register);

router.get("/login", showLoginPage);
router.post("/login", login);

router.post("/logout", authMiddleware, logout);

module.exports = router;