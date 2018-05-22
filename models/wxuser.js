var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var WxUserSchema = new Schema({
  openId: { type: String,unique: true},
  appID: { type: String},
  arcID: { type: String },
  avatarUrl: { type: String},
  city: { type: String },
  language: {type: String},
  nickName: { type: String},
  province: { type: String},
  telNumber: { type: String },
  uName: { type: String},
  time: {  type: Date, default: Date.now },
  joinerTel: {type: String},
  joinerRemark: { type: String },
});
mongoose.model('WxUser', WxUserSchema);
