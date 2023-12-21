const Controller = require("../controllers");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { home, loginPage, submitPicture, showAllPicture, userProfilePage } =
  Controller;

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

router.get("/", loginPage);

router.get("/home", home);

router.get("/pictures", showAllPicture);
router.post("/pictures", upload.single("image"), submitPicture);

router.get("/user/detail", userProfilePage);

module.exports = router;
