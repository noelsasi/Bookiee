var db = require("../../models");

module.exports = {
  view: function (req, res, next) {
    res.render("users/signup", {
      url: req.path,
      title: "Sign-Up"
    });
  },
};
