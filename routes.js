var controllers = require("./app/controllers/");
var passport = require("passport");

module.exports = function(app) {
  app.get("/", AlreadyLoggedIn, controllers.login.view);
  app.post(
    "/",
    passport.authenticate("local-signin", {
      failureRedirect: "/",
      failureFlash: true,
      successRedirect: "/home"
    })
  );

  app.get("/register", AlreadyLoggedIn, controllers.signup.view);
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      failureRedirect: "/register",
      failureFlash: true,
      successRedirect: "/home"
    })
  );

  app.get("/logout", isLoggedIn, controllers.login.logout);

  app.get("/home", isLoggedIn, controllers.home.view);

  app.get("/authors", isLoggedIn, controllers.authors.view);
  app.post("/authors", isLoggedIn, controllers.authors.addAuthor);
  app.post("/authors/edit", isLoggedIn, controllers.authors.updateAuthor);
  app.post("/authors/delete", isLoggedIn, controllers.authors.deleteAuthor);

  app.get("/books", isLoggedIn, controllers.books.view);
  app.get("/getApi", isLoggedIn, controllers.books.getApi);

  app.get("/contact", isLoggedIn, controllers.contact.view);

  app.get("/notification", isLoggedIn, controllers.notification.notify);

  app.get("/user-edit", isLoggedIn, controllers.editProfile.view);
  app.post("/editProfile", isLoggedIn, controllers.editProfile.edit); // Ajax Call

  function isLoggedIn(req, res, next) {
    if (req.session.passport) return next();
    res.redirect("/");
  }

  function AlreadyLoggedIn(req, res, next) {
    if (req.session.passport) res.redirect("/home");
    return next();
  }

  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err,
        title: "error"
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {},
      title: "error"
    });
  });
};
