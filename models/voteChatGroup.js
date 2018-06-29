var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');

var VoteCahtGroupSchema = new Schema({
  groupId: { type: String},
  voteId: { type: String },
});
mongoose.model('VoteCahtGroup', VoteCahtGroupSchema);
