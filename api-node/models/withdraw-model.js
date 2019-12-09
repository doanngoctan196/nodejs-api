const database = require('../configuration/database')
const collection = 'withdraws'

buildProjection = () => {
    let projection = {}
    return projection
}
const withdrawModel = {
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
    addWithdraws: async input => {
        let document = {
            fullname: input['fullname'],
            email: input['email'],
            statuss: input['statuss'],
            withdraw: input['withdraw'],
            insertTime: new Date().getTime() / 1000
        }
        let result = await database.insertOne(collection, document)
        return result.ops
    }
}
module.exports = withdrawModel
