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


function index(req, res) {
    Request.find({})
    .then(function(requests) {
    res.json(requests);
    })
    .catch(function(err){
    res.status(500).json({ error: true });
    });
}

// show selective request info
function show(req, res) {
    Request.findById(req.params.id)
    .populate(requests)
    // look up nested populate 
    .then(function(requests){
        res.json(requests)
    })
}
// create account
function create(req,res){
    Request.create(req.body)
    .then(function(newRequest){
        res.json(newRequest)
    }).catch(function(err){
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