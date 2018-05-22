var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var NoticeTaskSchema = new Schema({
  openId: { type: String},
  noticeId: { type: String },
  date: { type: Date, default: Date.now},
  fileNumber: { type: String },
  title: {type: String},
  description: { type: String},
  name: { type: String},
});
mongoose.model('NoticeTask', NoticeTaskSchema);
