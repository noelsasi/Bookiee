const db = require('../models');
var config = require("../../config/config");

module.exports = {
  view: function (req, res, next) {
    db.Authors.findAll({
      where: {
        active: true
      },
      order: [
        ['id', 'ASC'],
      ]
    }).then((authors) => {
      if (authors) {
        athrs = authors.map(x => x.get({
          plain: true
        }));
      }
      // console.log('authors', athrs);
      res.render('authors', {
        title: 'Authors List',
        authors: athrs,
        url: req.path,
        user: req.session.passport.user
      });
    })
  },
  addAuthor: function (req, res, next) {
    db.Authors.create({
      name: req.body.name,
      no_of_books: req.body.books,
      place: req.body.place,
      genre: req.body.genre,
      active: true
    }).then(() => {
      req.flash('success', 'Author added successfully');
      res.redirect('back');
    });
  },
  updateAuthor: function (req, res, next) {
    db.Authors.update({
      name: req.body.name,
      no_of_books: req.body.books,
      place: req.body.place,
      genre: req.body.genre,
      likes: req.body.likes
    }, {
        where: {
          id: req.body.authId
        }
      }).then(() => {
        req.flash('info', 'updated successfully');
        res.redirect('back');
      });
  },
  deleteAuthor: function (req, res, next) {
    db.Authors.update({
      active: false
    }, {
        where: {
          id: req.body.authId
        }
      }).then(() => {
        req.flash('error', 'You Deleted Author');
        res.redirect('back');
      });
  }
}
