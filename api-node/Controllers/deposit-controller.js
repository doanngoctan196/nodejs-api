const depositModel = require('../models/deposit-model')
const { check, validationResult } = require('express-validator')
const utils = require('./../configuration/utils')
const common = require('./../configuration/common')
const validatorDeposit = {
    validate: method => {
        switch (method) {
            case 'deposit': {
                return [
                    check('fullname')
                        .isAlpha()
                        .withMessage('input fullname must be "a-z"')
                        .isLength({ min: 4 })
                        .withMessage('input fullname length'),
                    check('email')
                        .exists()
                        .withMessage('email must exists')
                        .isLength({ min: 4 })
                        .withMessage('email cannot empty'),
                    check('deposit')
                        .isNumeric()
                        .withMessage(' input deposit must be number'),
                    check('statuss')
                        .isLength({ min: 4 })
                        .withMessage(' statuss cannot empty')
                ]
            }
        }
    }
}

const depositController = {
    getDeposit: async (req, res) => {
        const result = await depositModel.find(req.query)
        utils.successResponse(result, res)
    },
    getByid: async (req, res) => {
        try {
            const result = await depositModel.findById(req.params.id)
            common.findDataResponse(result, res)
        } catch (err) {
            utils.badRequestResponse('is not id')
        }
    },
    addDeposit: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        else{
            const result = await depositModel.addDeposits(req.body)
            common.addStateResponse(result, res)
        }
    }
}

module.exports = { depositController, validatorDeposit }
