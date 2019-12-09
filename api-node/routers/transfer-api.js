const express = require('express')
const router = express.Router()
const { transferController, validatorTransfer } = require('../controllers/transfer-controller')

//get all transfer
router.get('/', transferController.getTransfer)

//GET Transfer-{id}
router.get('/:id', transferController.getByid)

//Create transfer
router.post('/', validatorTransfer.validate('transfer'), transferController.addTransfer)

module.exports = router
