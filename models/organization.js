var mongoose = require('mongoose');
const Schema = mongoose.Schema

var organizationSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  phoneNum: {type: String, require: true},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  requests: [{type: Schema.Types.ObjectId, ref: 'Request'}]

}, {
  timestamps: true
});

module.exports = mongoose.model('Organization', organizationSchema);