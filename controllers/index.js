const picture = require("../models/picture");

class Controller {
  static loginPage(req, res) {
    const login = true;
    res.render("_layout", { login, body: "pictureList" });
  }

  static home(req, res) {
    res.render("home");
  }

  static showAllPicture(req, res) {
    res.render("pictureList");
  }

  static submitPicture(req, res) {
    res.send("Picture successfully uploaded");
  }

  static userProfilePage(req, res) {
    const login = true
    const renderData = {
      login,
      body: "profilePage",
    };
    res.render("_layout", renderData);
  }
  //   static home(req, res) {}

  //   static home(req, res) {}

  //   static home(req, res) {}

  //   static home(req, res) {}

  //   static home(req, res) {}

  //   static home(req, res) {}

  //   static home(req, res) {}
}

module.exports = Controller;
