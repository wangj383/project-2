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
    const organization = req.query.organization
    Request.find({ organization: organization })
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

// function create(req,res){
//     Request.create(req.body)
//     .then(function(newRequest){
//         res.json(newRequest)
//     }).catch(function(err){
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({ error: 'Invalid Inputs' });
//         }
//         res.status(500).json({ error: 'Could not create request' });
//     })
// }



// create request under the user
function create(req,res) {
    var user = User.findById(req.params.id)
    var newRequest = Request.create(req.body)
    Promise.all([user,newRequest])
    .then(function(results){
        // console.log(newRequest.users)
        console.log(results[0])
        results[1].users.push(results[0])
        results[1].save()
        //console.log(results[0].requests)
        results[0].requests.push(results[1])
        // **Later need to redirect save to the request page
        results[0].save()
        return res.json(results[1]);
    })
    .catch(function(err){
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid Inputs' });
        }
        res.status(500).json({ error: 'Could not create request' });
    })
}

// Request.create(req.body).then(request => res.json(request))

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

