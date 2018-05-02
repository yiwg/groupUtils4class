var models = require('../models/index');
var User = models.User;
//var User  = require('../models/user');

exports.newAndSave = function (name, loginname, pass, email, avatar_url, active,uuid, callback) {
  var user         = new User();
  user.name        = loginname;
  user.loginname   = loginname;
  user.pass        = pass;
  user.email       = email;
  user.avatar      = avatar_url;
  user.active      = active || false;
  //user.accessToken = uuid.v4();

  user.save(callback);
};

