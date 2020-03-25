const Organization = require('./models/organization');
const User = require('./models/user')
const Request = require('./models/request');


require('dotenv').config();
require('./config/database');

// let createdOrgs = []
// let createdUsers = []

const orgList = [
    {
        name: "General Assembly",
        email: "yvonnewjy@hotmail.com",
        phoneNum: "4168255555",
    },
    {
        name: "Slack",
        email: "yvonnewjy97@gmail.com",
        phoneNum: "4168255566",
    }
]

const userList = [
    {
        name: "drive1",
        driver: true,
        car: [{
            model: "Civic",
            make: "Honda",
            year: 2018,
            color: "white",
            passengerCapacity: 4
          }],
        email: "yvonnewjy@hotmail.com",
        phoneNum: "4162342222",
    },
    {
        name: "rider1",
        driver: false,
        email: "xiaoxiong@hotmail.com",
        phoneNum: "6479994444"
    },
    {
        name: "rider2",
        driver: false,
        email: "yyyyyyyy@hotmail.com",
        phoneNum: "6479994424"
    }
]

const requestList =[
    {
        pickUpTime: "Every Monday, 9am",
        pickUpAddress: "CN Tower",
        destinationAddress: "220 King Street West",
        seats: 1,
        urgent: true
    }

]
// Relationship: All users are related to the first request, and all users and request are part of the first organization
Organization.deleteMany({}, function() {
    User.deleteMany({}, function(){
        Request.deleteMany({}, function(){
            Organization.create(orgList, function(err, orgs) {
                User.create(userList, function(err, usersCreated) {
                    Request.create(requestList, function(err, requestsCreated) {
                        requestsCreated[0].users.push(usersCreated[0],usersCreated[1])
                        requestsCreated[0].save()
                        usersCreated[0].requests.push(requestsCreated[0])
                        usersCreated[1].requests.push(requestsCreated[0])
                        usersCreated[2].requests.push(requestsCreated[0])
                        usersCreated[0].save()
                        usersCreated[1].save()
                        usersCreated[2].save()
                        orgs[0].users.push(usersCreated[0],usersCreated[1],usersCreated[2])
                        orgs[0].requests.push(requestsCreated[0])
                        orgs[0].save(function() {
                        })
                    })
                })
            })
        })
    })
})

// User.create(userList, function(err, users) {
//     orgList[0].users = users.map(doc => doc._id)
//     Organization.create(orgList, fucntion(err, orgs) {

//     })
// })

// DRAFT***
// Organization.deleteMany({})
//     .then(() => {
//         return Organization.create(orgList)
//     })
//     .then(orgs => {
//         createdOrgs = orgs
//         return User.create(userList)
//     })
//     .then(users => {
//         createdUsers = users
//         let firstOrg = createdOrgs[0]
//         firstOrg.users.push(users[0])
//         return firstOrg.save()
//     })




// const organizations_list = [
//   {
//     name: "General Assembly",
//     email: "yvonnewjy@hotmail.com",
//     phoneNum: "4168255555",
//     users:[{
//         name: "Yvonne Wang",
//         driver: true,
//         car: [{
//             model: "Civic",
//             make: "Honda",
//             year: 2018,
//             color: "white",
//             passengerCapacity: 4
//           }],
//         email: "yvonnewjy@hotmail.com",
//         phoneNum: "4162342222",
//         request:[{
//             users:[{
//                 name: "Yvonne Wang",
//                 driver: true,
//                 car: [{
//                     model: "Civic",
//                     make: "Honda",
//                     year: 2018,
//                     color: "red",
//                     passengerCapacity: 2
//                   }],
//                 email: "yvonnewjy@hotmail.com",
//                 phoneNum: "4162342222",   
//                 },
//                 {
//                 name: "Yvonne2",
//                 driver: false,
//                 email: "yvonnewjy@hotmail.com",
//                 phoneNum: "4162342222",

//             }]
//             ]
    
//         }],
//     requests: [{
//         users: [{

//         }],
//         pickUpTime: {type: String, require: true},
//         pickUpAddress: {type: String, require: true},
//         destinationAddress: {type: String, require: true},
//         schedule: {type: String, require: true},
//         seats: {type: Number, require: true},
//         expired: {type: Boolean, default: false},
//         urgent: {type: Boolean, default: false}
//     }]
//   },
//   {
    
//   },
//   {
    
//   },
//   {
    
//   }
// ];

// // remove all records that match {} -- which means remove ALL records
// db.Organization.deleteMany({}, function(err, organizations){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all organizations');

//     // create new records based on the array books_list
// db.Organization.create(organizations_list, function(err, organizations){
//       if (err) { return console.log('err', err); }
//       console.log("created", organizations.length, "organizations");
//       process.exit();
//     });
//   }
// });

