const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth-controller.js");

console.log("Login function:", login);

router.route("/login").post(login);
module.exports = router;
