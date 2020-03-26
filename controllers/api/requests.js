const Request = require('../../models/request');
const User = require('../../models/user');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteRequest,
    cancelRequest,
    acceptRequest,
};

// show all requests for that organizations
// later need to see how to select driver requests and user request in two different tabs on the website
function index(req, res) {
    const organization = req.query.organization
    Request.find({organization: organization})
    .populate('user')
    .then(function(requests){
        res.json(requests);
    })
    .catch(function(err){
        res.status(500).json({ error: true });
    })
}

// show selective request info
function show(req, res) {
    Request.findById(req.params.id)
    .populate(user)
    .then(function(requests){
        res.json(requests)
    })
}

// create request under the user

function create(req,res){
    Request.create(req.body)
    .then(function(request){
        res.json(request)
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not create request' });
    })
}

function update(req, res) {
    Request.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )
    .then(function(requests) {
        res.status(200).json(requests);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not update request' });
    })
}

function deleteRequest(req,res) {
    Request.findByIdAndDelete(
        req.params.id,
        req.body,
    )
    .then(function(requests) {
        res.status(200).json(requests);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not delete request' });
    })
}

function cancelRequest(req,res) {
    Request.findByIdAndUpdate(
        req.params.id, 
        {canceled: true}, 
        { new: true }
    )
    .then(function(requests) {
        res.status(200).json(requests);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not update request' });
    })
}

function acceptRequest(req,res) {
    Request.findByIdAndDelete(
        req.params.id,
        {accepted: true}, 
        { new: true }
    )
    .then(function(requests) {
        res.status(200).json(requests);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not update request' });
    })
}

