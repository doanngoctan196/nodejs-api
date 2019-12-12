const database = require('../configuration/database')
const collection = 'users'
const constant = require('./../configuration/constant')

buildProjection = () => {
    let projection = {}
    return projection
}

const user = {
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
    addUser: async input => {
        let document = {
            fullname: input['fullname'],
            email: input['email'],
            birthday: input['birthday'],
            cmnd: input['cmnd'],
            address: input['address'],
            income: input['income'],
            mobile: input['mobile']
        }
        if (input['income']=== 'basic' ) {
            if(input['money'] > 0 && input['money'] < 500){
                let result = await database.insertOne(collection, document)
                return result.ops
            }   
        }
        if (input['income']=== 'gold' ) {
            if(input['money'] > 0 && input['money'] < 1500){
                let result = await database.insertOne(collection, document)
                return result.ops
            }   
        }
        if (input['income']=== 'premium' ) {
            if(input['money'] > 1500){
                let result = await database.insertOne(collection, document)
                return result.ops
            }   
        }
    },
    updateUser: async (id, input) => {
        let filter = database.buildFilterById(id)
        let document = {}
        if (input['fullname'] !== undefined) {
            document['fullname'] = input['fullname']
        }
        if (input['address'] !== undefined) {
            document['address'] = input['address']
        }
        if (input['income'] !== undefined) {
            document['income'] = input['income']
        }
        if (input['money'] !== undefined) {
            document['money'] = input['money']
        }
        let result = await database.updateOne(collection, filter, document)
        return result.modifiedCount
    },
    deleteUser: async id => {
        let filter = database.buildFilterById(id)
        let result = await database.deleteLogic(collection, filter)
        return result.modifiedCount
    },
    getUserByEmail: async email => {
        let filter = {}
        filter[constant.Collections.Common.Email] = email
        return await database.findOne(collection, filter)
    }
}

module.exports = user
