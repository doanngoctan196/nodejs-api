const database = require('../configuration/database')
const collection = 'deposits'

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
        let document = {
            fullname: input['fullname'],
            email: input['email'],
            statuss: input['statuss'],
            deposit: input['deposit'],
        }
        let timeStart = new Date().setHours(0, 0, 0) / 1000

        let timeEnd = new Date().setHours(23, 59, 59) / 1000
        let today = new Date().getTime() / 1000

            if (today >= timeStart && today <= timeEnd) {
                database.db
                    .collection('deposits')
                    .countDocuments(
                        { insertTime: { $gt: timeStart, $lt: timeEnd }, email: input['email'] },
                        async function(err, count) {
                            let counts = count
                            if (input['statuss'] === 'basic' && input['deposit'] >= 0 && input['deposit'] <= 500) {
                                if (counts < 3) {
                                    document['deposit'] = input['deposit']
                                }
                            }if (input['statuss'] === 'gold' && input['deposit'] >= 0 && input['deposit'] <= 1500) {
                                if (counts < 5) {
                                    document['deposit'] = input['deposit']
                                }
                            }if (input['statuss'] === 'premium') {
                                document['deposit'] = input['deposit']
                            }
                        }
                    )
            }
        let result = await database.insertOne(collection, document)
        return result.ops
    }
}
module.exports = depositModel
