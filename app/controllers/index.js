var homeController = require("./homeController");
var authorsController = require("./authorsController");
var booksController = require("./booksController");
var contactController = require("./contactController");
var loginController = require("./users/loginController")
var signupController = require("./users/signupController")
var notificationController = require("./notificationController");
var editProfileController = require("./users/editProfileController");
module.exports = {
  home: homeController,
  authors: authorsController,
  books: booksController,
  contact: contactController,
  login: loginController,
  signup: signupController,
  notification: notificationController,
  editProfile: editProfileController
};
