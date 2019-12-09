const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const usermodel = require('../models/users-model')
const database = require('../configuration/database')
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
        }
    }
}

const userController = {
    addUser: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        let incomes = req.body.income
        let moneys = req.body.money
        try {
            if (incomes === 'basic') {
                if (moneys >= 0 && moneys <= 1000) {
                    const result = await usermodel.addUser(req.body)
                    res.status(201).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            } else if (incomes === 'gold') {
                if (moneys >= 1000 && moneys <= 1500) {
                    const result = await usermodel.addUser(req.body)
                    res.status(201).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            } else if (incomes === 'premium') {
                if (moneys >= 1500) {
                    const result = await usermodel.addUser(req.body)
                    res.status(201).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            }
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await usermodel.find(req.query)
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json({ message: error.message })
        }
    },
    getByid: async (req, res) => {
        try {
            const result = await usermodel.findById(req.params.id)
            res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({ message: 'cant find user please enter correct id' })
        }
    },
    deleteByid: async (req, res) => {
        try {
            const result = await usermodel.deleteUser(req.params.id)
            res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({ message: 'cant find user please enter correct id' })
        }
    },
    updateUser: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        let incomes = req.body.income
        let moneys = req.body.money
        try {
            if (incomes === 'basic') {
                if (moneys >= 0 && moneys <= 1000) {
                    const result = await usermodel.updateUser(req.params.id, req.body)
                    res.status(200).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            } else if (incomes === 'gold') {
                if (moneys >= 1000 && moneys <= 1500) {
                    const result = await usermodel.updateUser(req.params.id, req.body)
                    res.status(200).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            } else if (incomes === 'premium') {
                if (moneys >= 1500) {
                    const result = await usermodel.updateUser(req.params.id, req.body)
                    res.status(200).json(result)
                } else {
                    res.status(402).json({ message: 'err input money' })
                }
            }
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}
module.exports = { userController, validatorUser }
