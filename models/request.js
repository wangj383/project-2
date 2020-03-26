var mongoose = require('mongoose');
const Schema = mongoose.Schema

var requestSchema = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    organization: [{type: Schema.Types.ObjectId, ref: 'Organization'}],
    expired: {type: Boolean, default: false},
    accepted: {type: Boolean, default: false},
    canceled: {type: Boolean, default: false},
    pickUpTime: {type: String, require: true},
    pickUpAddress: {type: String, require: true},
    destinationAddress: {type: String, require: true},
    // Will display as "seats needed" or "seats avaialble" depending on the users' identity
    seats: {type: Number, require: true},
    urgent: {type: Boolean, default: false}
    // can later add in another schema of notes!
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);