const express = require('express')
const router = express.Router()
const { userController, validatorUser } = require('../controllers/user-controller')

// //Get one User
router.get('/:id', userController.getByid)

// //Delete one User
router.delete('/:id', userController.deleteByid)

// //Update User
router.put('/:id', validatorUser.validate('update'), userController.updateUser)
router.get('/', userController.getUser)
router.post('/', validatorUser.validate('addUser'), userController.addUser)
module.exports = router
