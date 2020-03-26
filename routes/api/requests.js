var express = require('express');
var router = express.Router();
const requestsCtrl = require('../../controllers/api/requests')

router.get('/',requestsCtrl.index)
router.get('/:id',requestsCtrl.show)
router.post('/', requestsCtrl.create)
router.put('/:id',requestsCtrl.update)
router.put('/:id',requestsCtrl.cancelRequest)
router.put('/:id',requestsCtrl.acceptRequest)
router.delete('/:id',requestsCtrl.delete)

module.exports = router;