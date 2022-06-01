const router = require("express").Router();
const { login, register } = require("../controller/userController");

// Login Page
router.route("/login").get(login);
// Register Page
router.route("/register").get(register);

module.exports = router;
