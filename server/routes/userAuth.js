const router = require("express").Router();
const validateInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const controller = require("../controllers/user.controller");

//REGISTER ROUTE
router.post("/register", validateInfo, controller.user_register);

//LOGIN ROUTE
router.post("/login", validateInfo, controller.user_login);

router.get("/verify-token", authorization, controller.user_token_verify);

module.exports = router;
