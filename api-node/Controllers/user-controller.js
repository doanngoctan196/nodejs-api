const { check, validationResult } = require('express-validator')
const usermodel = require('../models/users-model')
const Constants = require('../configuration/constant')
const utils = require('./../configuration/utils')
const common = require('./../configuration/common')
const validatorUser = {
    validate: method => {
        switch (method) {
            case 'addUser': {
                return [
                    check(Constants.Collections.Common.Email)
                        .isEmail()
                        .withMessage('email must be exists greater than 3 characters')
                        .custom(async value => {
                            let result = await usermodel.getUserByEmail(value)
                            if (result) {
                                throw new Error('email already exists')
                            }
                            return true
                        }),
                    check(Constants.Collections.Common.Mobile)
                        .exists()
                        .withMessage('mobile must be exists ')
                        .isLength({ min: 4 })
                        .withMessage('mobile must be greater than 3 characters')
                        .custom(async value => {
                            let result = await usermodel.getMobileUser(value)
                            if (result) {
                                throw new Error('mobile already exists')
                            }
                            return true
                        }),
                    check('cmnd')
                        .isLength({ min: 4 })
                        .withMessage('cmnd cannot empty greater than 3 characters'),
                    check('fullname')
                        .isAlpha()
                        .withMessage('Fullname must be "a-z" greater than 3 characters'),
                    check('address')
                        .isLength({ min: 4 })
                        .withMessage('address must be greater than 3 characters'),
                    check('birthday')
                        .matches(
                            /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/
                        )
                        .withMessage('birthday must be "YYYY/MM/DD"'),
                    check('income')
                        .isLength({ min: 4 })
                        .withMessage(' income must be greater than 3 characters'),
                    check('money')
                        .isNumeric()
                        .withMessage('input money must be number')
                ]
            }
            case 'update': {
                return [
                    check('fullname')
                        .isAlpha()
                        .withMessage('Full name must be "Aa-Zz" greater than 3 characters'),
                    check('address')
                        .isLength({ min: 1 })
                        .withMessage('address must be greater than 3 characters'),
                    check('birthday')
                        .matches(
                            /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/
                        )
                        .withMessage('birthday must be "YYYY/MM/DD"')
                ]
            }
        }
    }
}

const userController = {
    addUser: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        try {
            const result = await usermodel.addUser(req.body)
            common.addStateResponse(result, res)
        } catch (error) {
            utils.badRequestResponse('param invalid', res)
        }
    },
    getUser: async (req, res) => {
        const result = await usermodel.find(req.query)
        utils.successResponse(result, res)
    },
    getByid: async (req, res) => {
        try {
            const result = await usermodel.findById(req.params.id)
            common.findDataResponse(result, res)
        } catch (err) {
            utils.badRequestResponse('is not id', res)
        }
    },
    deleteByid: async (req, res) => {
        try {
            const result = await usermodel.deleteUser(req.params.id)
            common.findDataResponse(result, res)
        } catch (err) {
            utils.internalServerResponse({}, res)
        }
    },
    updateUser: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        try {
            const result = await usermodel.updateUser(req.params.id, req.body)
            common.modifyStateResponse(result, res)
        } catch (error) {
            utils.badRequestResponse('cant find user', res)
        }
    }
}
module.exports = { userController, validatorUser }
