const Organization = require('../../models/organization');
const Request = require('../../models/request');
const User = require('../../models/user');

module.exports = {
    index,
    show,
    create,
    update,
    delete:deleteOrganization
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
    var organization = Organization.findById(req.params.id);
    var users = User.find({organization: organization.id});
    var requests = Request.find({organization: organization.id});

    Promise.all([organization,users,requests])
    .then(function(results){
        return res.json(results)
    })
    .catch(function(err){
        res.status(500).json({ error: true });
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

function deleteOrganization(req,res) {
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
