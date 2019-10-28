const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  view: function(req, res, next) {
    Promise.all([
      db.Article.findAll({
        where: {
          active: true
        }
      }),
      db.Authors.findAll({
        where: {
          place: "Hyderabad"
        }
      })
    ]).then(data => {
      var artcles = "",
        athrs = "";
      if (data) {
        artcles = data[0].map(x =>
          x.get({
            plain: true
          })
        );
        athrs = data[1].map(x =>
          x.get({
            plain: true
          })
        );
      }
      // req.flash('success', 'Welcome  ' + req.session.passport.user.fullname);
      res.render("index", {
        title: "Home",
        articles: artcles,
        authors: athrs,
        url: req.path,
        user: req.session.passport.user
      });
    });
  }
};
