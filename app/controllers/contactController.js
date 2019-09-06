const db = require('../models');

module.exports = {
  view: function (req, res, next) {
      // console.log('authors', athrs);
      res.render('contact', {
        title: 'Contact Us',
        // authors: athrs,
        url: req.path,
        user: req.session.passport.user
      });
    
  }
}
