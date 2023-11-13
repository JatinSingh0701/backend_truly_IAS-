const router = require("express").Router();

const authController = require("../controllers/auth.controller");

// Router for signup
router.post("/signup", authController.signup);

// Router for login
router.post("/login", authController.login);

module.exports = router;
