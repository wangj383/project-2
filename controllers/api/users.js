const User = require('../../models/user');
const Request = require('../../models/request');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteUser,
};
function index(req, res) {
    var organization = req.query.organization
    User.find({organization: organization })
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
    .then(function(user){
        res.json(user)
    })
}

// create account
function create(req,res){
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

