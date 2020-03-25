var mongoose = require('mongoose');
const Schema = mongoose.Schema

var requestSchema = new Schema({
    expired: {type: Boolean, default: false},
    accepted: {type: Boolean, default: false},
    canceled: {type: Boolean, default: false},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    pickUpTime: {type: String, require: true},
    pickUpAddress: {type: String, require: true},
    destinationAddress: {type: String, require: true},
    // Will display as "seats needed" or "seats avaialble" depending on the users' identity
    seats: {type: Number, require: true},
    urgent: {type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);