const depositModel = require('../models/deposit-model')
const { check, validationResult } = require('express-validator')
const comon = require('./../configuration/common')
const utils = require('./../configuration/utils')
const validatorDeposit = {
    validate: method => {
        switch (method) {
            case 'deposit': {
                return [
                    check('fullname')
                        .isLowercase()
                        .withMessage('input fullname must be lowercase')
                        .isAlpha()
                        .withMessage('input fullname must be "a-z"')
                        .isLength({ min: 4 })
                        .withMessage('input fullname length'),
                    check('email')
                        .isLowercase()
                        .withMessage('input email must be lowercase')
                        .isEmail()
                        .withMessage('not is email')
                        .isLength({ min: 4 })
                        .withMessage('input email length'),
                    check('deposit')
                        .isNumeric()
                        .withMessage(' input deposit must be number'),
                    check('statuss')
                        .isLowercase()
                        .withMessage('input statuss must be lowercase')
                        .isLength({ min: 4 })
                        .withMessage(' input statuss length')
                ]
            }
        }
    }
}

const depositController = {
    getDeposit: async (req, res) => {
        const result = await depositModel.find(req.query)
        utils.successResponse(result,res)
    },
    getByid: async (req, res) => {
        try {
            const result = await depositModel.findById(req.params.id)
            comon.findDataResponse(result,res)
        } catch (err) {
            utils.badRequestResponse('cant find id', res)
        }
    },
    addDeposit: async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const result = await depositModel.addDeposits(req.body)
            comon.addStateResponse(result,res) 
        }else{
            console.log('deposit-controller.addDeposit', errors)
            utils.badRequestResponse('param invalid', res)
        }
        
    }
}

module.exports = { depositController, validatorDeposit }
