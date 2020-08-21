const UserController = require("../controller/UserController");
const router = require("express").Router();
// const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/authorization");

router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.post("/googleSignIn", UserController.googleSignIn);

module.exports = router;
