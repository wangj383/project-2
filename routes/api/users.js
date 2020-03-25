var express = require('express');
var router = express.Router();
const usersCtrl = require('../../controllers/api/users')


router.get('/',usersCtrl.index)
router.get('/:id',usersCtrl.show)
router.post('/', usersCtrl.createAccount)
router.post('/:id/requests', usersCtrl.createRequest)
router.put('/:id',usersCtrl.update)
router.delete('/:id',usersCtrl.delete)


module.exports = router;
