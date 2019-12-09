const express = require('express')
const router = express.Router()
const { validatorWithdraw, withdrawController } = require('../controllers/withdraw-controller')

//get all withdraw
router.get('/', withdrawController.getWithdraw)

//get  withdraw - {id}
router.get('/:id', withdrawController.getByid)

//Create withdraw
router.post('/', validatorWithdraw.validate('withdraw'), withdrawController.addWithdraw)

module.exports = router
