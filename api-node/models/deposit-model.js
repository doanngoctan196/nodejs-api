const database = require('../configuration/database')
const collection = 'deposits'
const utils = require('./../configuration/utils')
const constant = require('./../configuration/constant')
buildProjection = () => {
    let projection = {}
    return projection
}
const depositModel = {
    find: async query => {
        let filter = query
        // declare fields that needs to retrieve instead of get all of fields
        let options = database.createFindOptions({ projection: buildProjection() })
        return await database.find(collection, filter, options)
    },
    findById: async id => {
        let filter = database.buildFilterById(id)
        let options = database.createFindOptions({ projection: buildProjection() })
        return await database.findOne(collection, filter, options)
    },
    addDeposits: async input => {
        let timeStart = new Date().setHours(0, 0, 0)
        let timeEnd = new Date().setHours(23, 59, 59)
        let document = {
            fullname: input['fullname'],
            email: input['email'],
            statuss: input['statuss'],
            deposit: input['deposit']
        }
    let count = await database.db.collection(collection).countDocuments({insertTime : {$gt : timeStart , $lt : timeEnd}, email : input['email']})
        if (input['statuss'] === 'basic' && input['deposit'] > 0 && input['deposit'] < 500 && count < 3) {
                let result = await database.insertOne(collection, document)
                return result.ops
          }
        if (input['statuss'] === 'gold' && input['deposit'] > 0 && input['deposit'] < 1500 && count < 5) {
                let result = await database.insertOne(collection, document)
                return result.ops
          }
        if (input['statuss'] === 'premium') {
                let result = await database.insertOne(collection, document)
                return result.ops
          }
    },

}
module.exports = depositModel
