const Constants = require('./constant')

const response = (result, status, message) => {
    var output = {}
    output.status = status
    output.message = message
    output.data = result ? result : true
    return output
}

const utils = Object.freeze({
    successResponse: (result, res) => {
        return res.status(200).json(response(result, Constants.Response.Success, 'OK'))
    },
    internalServerResponse: (result, res) => {
        return res.status(500).json(response(result, Constants.Response.Failure, 'Sever Error'))
    },
    badRequestResponse: (result, res) => {
        return res.status(400).json(response(result, Constants.Response.Failure, 'Bad Request'))
    },
})
module.exports = utils