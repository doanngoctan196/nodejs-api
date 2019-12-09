const express = require('express')
const router = express.Router()
const { depositController, validatorDeposit } = require('../controllers/deposit-controller')

//GET ALL DEPOSIT
router.get('/', depositController.getDeposit)

//GET ByID DEPOSIT
router.get('/:id', depositController.getByid)

//CREATE DEPOSIT
router.post('/', validatorDeposit.validate('deposit'), depositController.addDeposit)

module.exports = router
