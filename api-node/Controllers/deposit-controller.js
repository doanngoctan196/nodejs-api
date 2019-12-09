const depositModel = require('../models/deposit-model')
const { check, validationResult } = require('express-validator')
const Constants = require('../configuration/constant')
const database = require('../configuration/database')
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
        try {
            const result = await depositModel.find(req.query)
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json({ message: error.message })
        }
    },
    getByid: async (req, res) => {
        try {
            const result = await depositModel.findById(req.params.id)
            res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({ message: 'Could not find user please enter correct id' })
        }
    },
    addDeposit: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        let timeStart = new Date().setHours(0, 0, 0) / 1000

        let timeEnd = new Date().setHours(23, 59, 59) / 1000
        let today = new Date().getTime() / 1000

        try {
            if (today >= timeStart && today <= timeEnd) {
                database.db
                    .collection('deposits')
                    .countDocuments(
                        { insertTime: { $gt: timeStart, $lt: timeEnd }, email: req.body.email },
                        async function(err, count) {
                            let counts = count
                            let limit = req.body.statuss
                            let Dep = req.body.deposit
                            if (limit === 'basic' && Dep >= 0 && Dep <= 500) {
                                if (counts < 3) {
                                    const result = await depositModel.addDeposits(req.body)
                                    return res.status(200).json(result)
                                } else {
                                    return res.status(402).json({ message: 'error limit input' })
                                }
                            } else if (limit === 'gold' && Dep >= 0 && Dep <= 1500) {
                                if (counts < 5) {
                                    const result = await depositModel.addDeposits(req.body)
                                    return res.status(200).json(result)
                                } else {
                                    return res.status(402).json({ message: 'error limit input' })
                                }
                            } else if (limit === 'premium') {
                                const result = await depositModel.addDeposits(req.body)
                                return res.status(200).json(result)
                            } else {
                                res.status(402).json({ message: 'error limit input' })
                            }
                        }
                    )
            } else {
                return res.status(400).json({ message: 'erorr limit time' })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = { depositController, validatorDeposit }
