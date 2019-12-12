const utils = require('./utils')
const constants = require('./constant')

const common = {
    isStrEmpty: o => {
        return !o || o === '' || o.trim().length === 0
    },
    isObjectEmpty: o => {
        return !o || o === {} || JSON.stringify(o) === '{}'
    },
    isArrayEmpty: o => {
        return !o || o.length === 0
    },
    modifyStateResponse: (result, res) => {
        if (constants.ModifiedSuccess === result) {
            return utils.successResponse(result, res)
        } else {
            return utils.badRequestResponse('cant find id', res)
        }
    },
    addStateResponse: (result, res) => {
        if (result) {
            return utils.successResponse(result, res)
        } else {
            return utils.badRequestResponse('params invalid', res)
        }
    },
    findDataResponse: (result, res) => {
        if (result) {
            return utils.successResponse(result, res)
        } else {
            return utils.badRequestResponse('Data invalid or deleled', res)
        }
    }
}
module.exports = common
