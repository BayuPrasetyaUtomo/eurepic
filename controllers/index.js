const { User, Profile, Tag, Picture } = require("../models/index");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");

class Controller {
  static formLoginPage(req, res) {
    try {
      const { userId } = req.session;
  
      console.log("UserId:", userId);
  
      const renderData = {
        body: "loginPage",
        userId: userId,
      };
  
      res.render("_layout", renderData);
    } catch (error) {
      console.error("Error in formLoginPage:", error); 
      res.send(error);
    }
  }

  static async loginPage(req, res) {
    try {
      const { username, password } = req.body;

      console.log(req.body);

      const data = await User.findOne({
        where: {
          username: {
            [Op.eq]: username,
          },
        },
      });

      if (data) {
        const isValidPassword = bcrypt.compareSync(password, data.password);

        req.session.userId = data.id;
        // req.session.role = data.role;

        if (isValidPassword) {
          res.redirect("/pictures");
        } else {
          res.redirect("/login?error=Password incorrect");
        }
      } else {
        res.redirect("/login?error=Username is not found");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static logout(req, res) {
    try {
      req.session.destroy((error) => {
        if (error) {
          res.send(error);
        } else {
          res.redirect("/login");
        }
      });
    } catch (error) {
      res.send("Internal Server Error");
    }
  }

  static showAllPicture(req, res) {
    res.render("pictureList");
  }

  static submitPicture(req, res) {
    res.send("Picture successfully uploaded");
  }

  static async userProfilePage(req, res) {
    try {
      const { userId } = req.params;

      const dataUser = await User.findOne({
        include: {
          model: Profile,
        },
        where: {
          id: +userId,
        },
      });
      const { firstname, lastname, email, profilePicture } = dataUser.Profile;

      const renderData = {
        body: "profilePage",
        data: dataUser,
        firstname,
        lastname,
        email,
        profilePicture,
      };

      console.log(dataUser);
      // res.json(dataUser)
      res.render("_layout", renderData);
    } catch (error) {
      res.send(error)
    }
  }

  static async submitProfile(req, res) {
    try {
      const { username, password, firstname, lastname, email, profilePicture } =
        req.body;

      const { userId } = req.params;
      await User.update(
        {
          username: username,
          password: password,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      await Profile.update(
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          profilePicture: profilePicture,
        },
        {
          where: {
            UserId: userId,
          },
        }
      );
      res.redirect(`/user/${userId}/profile`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const validationErrors = error.errors.map((item) => ({
          field: item.path,
          message: item.message,
        }));
        res.render("_layout", {
          body: "profilePage",
          errors: validationErrors,
        });
      } else {
        // Handle other errors
        console.error(error);
        res.send(error);
      }
    }
  }

  static async editUserProfileById(req, res) {
    try {
      const { userId, profileId } = req.params;

      const { username, password, firstname, lastname, email, profilePicture } =
        req.body;

      console.log(
        username,
        password,
        firstname,
        lastname,
        email,
        profilePicture
      );

      await User.update(
        {
          username,
          password,
        },
        {
          where: {
            id: +userId,
          },
        }
      );

      await Profile.update(
        {
          firstname,
          lastname,
          email,
          profilePicture,
        },
        {
          where: {
            id: +profileId,
          },
        }
      );
      // res.send("post /incubators/:incubatorId/startUp/:startUpId/edit");

      res.redirect(`/user/${userId}`);
    } catch (error) {
      const { userId, profileId } = req.params;

      const err = error.errors.map((item) => item.message);
      res.redirect(`/incubators/${userId}/edit?error=` + error);
    }
  }

  static async showPicturesById(req, res) {
    try {
      const { userId } = req.params;
      console.log(userId);
      const dataUser = await User.findAll({
        include: Picture,
        where: {
          id: +userId,
        },
      });
      console.log(dataUser);
      res.render(dataUser);
    } catch (error) {}
  }

  static submitPicturesById(req, res) {}

  static deletePictureById(req, res) {}
}

module.exports = Controller;