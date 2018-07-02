var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var VoteUserSchema = new Schema({
  userId: { type: String},
  voteId: { type: String },
});
mongoose.model('VoteUser', VoteUserSchema);