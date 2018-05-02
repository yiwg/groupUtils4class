var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },
  avatar: { type: String},
  active: { type: String },
  accessToken: {type: String},
});
mongoose.model('User', UserSchema);
