const db = require('../../models');
var config = require("../../../config/config");

module.exports = {
  view: function (req, res, next) {
    db.Users.findOne({
      where: {
        id: req.session.passport.user.id,
        active: true
      },
      order: [
        ['id', 'ASC'],
      ]
    }).then((users) => {
      users = users.get();
      res.render('users/editProfile', {
        title: 'Edit Profile',
        users: users,
        url: req.path,
        user: req.session.passport.user
      });
    })
  },
  edit: function (req, res, next) {
    db.Users.update({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
    }, {
        where: {
          id: req.body.id
        }
      }).then(() => {
        res.send('data');
      });
  },
}