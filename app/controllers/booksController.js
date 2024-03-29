const db = require("../models");

module.exports = {
  view: function(req, res, next) {
    db.Article.findAll().then(data => {
      var books = "";
      if (data) {
        books = data.map(x =>
          x.get({
            plain: true
          })
        );
      }
      res.render("books", {
        title: "Books List",
        books: books,
        url: req.path,
        user: req.session.passport.user
      });
    });
  },

  getApi: function(req, res, next) {
    fetch("https://reqres.in/api/users?page=2")
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log("--res", res);
      });
  }
};
