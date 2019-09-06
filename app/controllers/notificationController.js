var db = require("../models");
var config = require("../../config/config");
var flash = require("connect-flash");

module.exports = {
  notify: function (req, res, next) {
    var data = {
      'info': req.flash('info'),
      'success': req.flash('success'),
      'error': req.flash('error')
    };
    res.send(data);
  }
}