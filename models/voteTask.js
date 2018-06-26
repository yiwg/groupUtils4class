var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var VoteTaskSchema = new Schema({
  openId: { type: String},
  voteId: { type: String },
  title: { type: String },
  description: { type: String },
  optionData: { type: String },
  date: { type: Date, default: Date.now},
  time: {type: String},
  noName: { type: String},
  radio: { type: String},
});
mongoose.model('VoteTask', VoteTaskSchema);
