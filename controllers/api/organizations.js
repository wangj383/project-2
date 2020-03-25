const Organization = require('../../models/organization');
const Request = require('../../models/request');
const User = require('../../models/user');

module.exports = {
    index,
    show,
    create,
    update,
    delete:deleteRequest
};

function index(req, res) {
    Organization.find({})
    .then(function(organizations) {
    res.json(organizations);
    })
    .catch(function(err){
    res.status(500).json({ error: true });
    });
}

// Show all info in the searched organization
// show all the users(including their requests) and requests(including the users related to the requests) within the organization.
function show(req, res) {
    Organization.findById(req.params.id)
    .populate({
        path: 'users',
        model: "User",
        populate: "requests"
    })
    .populate({
        path: 'requests',
        model: "Request",
        populate: "users"
    })
    // look up nested populate 
    .then(function(organization){
        res.json(organization)
    })
}

// Create an organization
function create(req,res){
    Organization.create(req.body)
    .then(function(newOrganization){
        res.json(newOrganization)
    }).catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not create organization' });
    })
}

// Update organization information.

function update(req, res) {
    Organization.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    )
    .then(function(organization) {
        res.status(200).json(organization);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not update organization' });
    })
}

function deleteRequest(req,res) {
    Organization.findByIdAndDelete(
        req.params.id,
        req.body,
    )
    .then(function(organizations) {
        res.status(200).json(organizations);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not delete organization' });
    })
}
