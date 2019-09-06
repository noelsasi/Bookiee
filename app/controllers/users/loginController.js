var db = require("../../models");

module.exports = {
  view: function (req, res, next) {
    res.render("users/login", {
      url: req.path,
      title: "Login"
    });
  },

  logout: function (req, res, next) {
    req.session.destroy(function (err) {
      if (err) console.log(err);
      res.clearCookie('connect.sid');
      req.logout();
      res.redirect('/');
    });
  }
};
