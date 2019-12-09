const database = require('../configuration/database')
const collection = 'transfers'

buildProjection = () => {
    let projection = {}
    return projection
}
const transferModel = {
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
    addTransfer: async input => {
        let document = {
            fullname: input['fullname'],
            email: input['email'],
            statuss: input['statuss'],
            transfer: input['transfer'],
            insertTime: new Date().getTime() / 1000
        }
        let result = await database.insertOne(collection, document)
        return result.ops
    }
}
module.exports = transferModel
