const Controller = require("../controllers");
const router = require("express").Router();
const {home} = Controller;

router.get('/', home)

// router.get('/')

module.exports = router;