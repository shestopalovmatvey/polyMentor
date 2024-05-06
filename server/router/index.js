const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const announcementController = require("../controllers/announcement-controller")
const router = new Router();
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("userName").isLength({ max: 200 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/createAannouncement", announcementController.create);
router.get("/universities", userController.getListOfUniver);


module.exports = router;
