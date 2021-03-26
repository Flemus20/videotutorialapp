var express = require("express");
var router = express.Router();



router.get("/", function (req, res, next) {
	res.clearCookie("token");
	res.clearCookie("loggedIn");
	res.redirect("/");
});


module.exports = router;

