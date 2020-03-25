const User = require('../../models/user');
const Request = require('../../models/request');

module.exports = {
    index,
    show,
    createAccount,
    createRequest,
    update,
    delete: deleteUser
};


function index(req, res) {
    User.find({})
    .then(function(users) {
    res.json(users);
    })
    .catch(function(err){
    res.status(500).json({ error: true });
    });
}

// show selective user info
function show(req, res) {
    User.findById(req.params.id)
    .populate({
        path: 'requests',
        model: "Request",
        populate: "users"
    })
    // look up nested populate 
    .then(function(users){
        res.json(users)
    })
}
// create account
function createAccount(req,res){
    User.create(req.body)
    .then(function(newUser){
        res.json(newUser)
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not create user' });
    })
}
// create request under the user
function createRequest(req,res) {
    User.findById(req.params.id)
    .then(function(user){
        const newRequest = Request.create()
        user.requests.push(newRequest.id)
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not create request' });
    })
}

function update(req, res) {
    User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    )
    .then(function(users) {
        res.status(200).json(users);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not update user' });
    })
}

// Should later design to only be able to delete personal info 
function deleteUser(req,res) {
    User.findByIdAndDelete(
        req.params.id,
        req.body,
    )
    .then(function(users) {
        res.status(200).json(users);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not delete user' });
    })
}
