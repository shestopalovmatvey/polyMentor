const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const announcementController = require("../controllers/announcement-controller");
const router = new Router();
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  body("userName").isLength({ max: 200 }),
  userController.registration
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Некорректный адрес электронной почты"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать минимум 3 символа"),
  userController.login
);
router.post(
  "/createAnnouncement",
  body("user").notEmpty(),
  body("theme").notEmpty(),
  body("userName").notEmpty(),
  body("post").notEmpty(),
  body("communicationMethod").notEmpty(),
  body("projectInfo").notEmpty(),
  body("tags").isArray({ min: 1 }),
  announcementController.create
);
router.post("/deleteAnnouncement", announcementController.deleteAnnouncement);
router.post("/updateAnnouncement", announcementController.updateAnnouncement);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);
router.post("/searchAnnouncements", announcementController.searchAnnouncements);
router.post("/addToFavorites", userController.addToFavorites);
router.post("/removeFromFavorites", userController.removeFromFavorites);
router.post(
  "/getAllFavoriteAnnouncements",
  userController.getAllFavoriteAnnouncements
);
router.get(
  "/getAnnouncementsByUser",
  announcementController.getAnnouncementsByUser
);
router.get("/getAllByDepartment", announcementController.getAllByDepartment);
router.get("/universities", userController.getListOfUniver);

module.exports = router;
