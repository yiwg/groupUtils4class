var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var NoticeUserSchema = new Schema({
  openId: { type: String},
  noticeId: { type: String },
});
mongoose.model('NoticeUser', NoticeUserSchema);
