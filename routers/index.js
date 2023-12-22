const Controller = require("../controllers");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const {
  formLoginPage,
  loginPage,
  logout,
  submitPicture,
  showAllPicture,
  userProfilePage,
  submitProfile,
  showPicturesById,
  submitPicturesById,
  deletePictureById,
} = Controller;

const isLogin = (req, res, next) => {
  const { username } = req.session;

  if (username) {
      return res.redirect("/");
  }

  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/login", isLogin, formLoginPage);
router.post("/login", loginPage);
router.get("/logout", logout);

router.get("/pictures", showAllPicture);
router.post("/pictures", upload.single("image"), submitPicture);

router.get("/user/:userId", showPicturesById);
router.post("/user/:userId", submitPicturesById);

router.get("/user/:userId/profile", userProfilePage);
router.post("/user/:userId/profile", submitProfile);

router.get("/user/:userId/picture/delete", deletePictureById);

module.exports = router;
