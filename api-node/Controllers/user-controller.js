const { check, validationResult } = require('express-validator')
const usermodel = require('../models/users-model')
const utils = require('./../configuration/utils')
const comon = require('./../configuration/common')
const validatorUser = {
    validate: method => {
        switch (method) {
            case 'addUser': {
                return [
                    check('email')
                        .isLowercase()
                        .withMessage('input email must be lowercase')
                        .isEmail()
                        .withMessage('not is email')
                        .isLength({ min: 4 })
                        .withMessage('input email length'),
                    check('mobile')
                        .isNumeric()
                        .withMessage(' input mobile must be number')
                        .isLength({ min: 4 })
                        .withMessage('input mobile length'),
                    check('cmnd')
                        .isNumeric()
                        .withMessage(' input cmnd must be number')
                        .isLength({ min: 4 })
                        .withMessage('input cmnd length'),
                    check('fullname')
                        .isLowercase()
                        .withMessage('input fullname must be lowercase')
                        .isAlpha()
                        .withMessage('input fullname must be "a-z"')
                        .isLength({ min: 4 })
                        .withMessage('input fullname length'),
                    check('address')
                        .isLength({ min: 4 })
                        .withMessage('input address length'),
                    check('birthday')
                        .matches(
                            /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/
                        )
                        .withMessage('birthday must be "YYYY/MM/DD"'),
                    check('income')
                        .isLowercase()
                        .withMessage('input income must be lowercase')
                        .isLength({ min: 4 })
                        .withMessage(' input income length')
                ]
            }
            case 'update': {
                return [
                    check('fullname')
                        .isLowercase()
                        .withMessage('input fullname must be lowercase')
                        .isAlpha()
                        .withMessage('input fullname must be "a-z"')
                        .isLength({ min: 4 })
                        .withMessage('input fullname length'),
                    check('address')
                        .isLength({ min: 4 })
                        .withMessage('input address length'),
                    check('income')
                        .isLowercase()
                        .withMessage('input income must be lowercase')
                        .isLength({ min: 4 })
                        .withMessage(' input income length')
                ]
            }
        }
    }
}

const userController = {
    addUser: async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const result = await usermodel.addUser(req.body)
            comon.addStateResponse(result,res)
        }
        else{
            console.log('user-controller.addUser',errors)
            utils.badRequestResponse('param invalid')
        }
    },
    getUser: async (req, res) => {
            const result = await usermodel.find(req.query)
            utils.successResponse(result,res)
    },
    getByid: async (req, res) => {
        try {
            const result = await usermodel.findById(req.params.id)
            comon.findDataResponse(result,res)
        } catch (err) {
            utils.badRequestResponse('cant find user' , res)
        }
    },
    deleteByid: async (req, res) => {
        try {
            const result = await usermodel.deleteUser(req.params.id)
            comon.findDataResponse(result,res)
        } catch (err) {
            utils.internalServerResponse({}, res)
        }
    },
    updateUser: async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const result = await usermodel.updateUser(req.params.id , req.body)
            comon.modifyStateResponse(result,res)
        }else{
            console.log('user-controller.updateUser', errors)
            utils.badRequestResponse('params invalid' , res)
        }

    }
}
module.exports = { userController, validatorUser }
