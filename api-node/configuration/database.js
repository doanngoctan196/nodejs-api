const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Logger = require('mongodb').Logger
const assert = require('assert')
const Constants = require('./constant')
const { ObjectId } = require('mongodb')

const mongodbURI = 'mongodb://localhost:27017'
const dbName = 'inforUsers'

buildUpdateFromInput = input => {
    let update = {}
    if (input) {
        input[Constants.Collections.Common.UpdateTime] = new Date().getTime()
        update[Constants.DbKeywords.Set] = input
    }
    return update
}
const database = {
    db: Db,
    // db: new Db(), /** This line is used to figure out information of Mongo Driver. Just used for local development */
    initDatabase: async () => {
        const client = new MongoClient(mongodbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await client.connect(function(err) {
            // assert.equal(null, err)
            // // Set debug level
            // Logger.setLevel('debug')
            // Logger.filter('class', ['Db', 'Cursor'])
            // // Set our own logger
            // Logger.setCurrentLogger(function(msg) {
            //     console.log(msg)
            // })
            database.db = client.db(dbName)
            database.db.command({ ismaster: false }, function(err) {
                assert.equal(null, err)
            })
        })
    },
    find: async (collectionName, filter, options) => {
        let notEqual = {}
        notEqual[Constants.DbKeywords.NotEqual] = Constants.Deleted
        filter[Constants.Collections.Common.DeleteFlag] = notEqual
        return await database.db
            .collection(collectionName)
            .find(filter, options)
            .toArray()
    },
    /** This function is used to find one document. */
    findOne: async (collectionName, filter, projection) => {
        return await database.db.collection(collectionName).findOne(filter, projection)
    },
    /** This function is used to insert one document. */
    insertOne: async (collectionName, data) => {
        data[Constants.Collections.Common.InsertTime] = new Date().getTime()
        return await database.db.collection(collectionName).insertOne(data)
    },
    /** This function is used to insert multiple documents. */
    insertMany: async (collectionName, data) => {
        database.db.collection(collectionName).insertMany(data)
    },
    /** This function is used to update one document. */
    updateOne: async (collectionName, filter, input) => {
        let update = buildUpdateFromInput(input)
        return await database.db.collection(collectionName).updateOne(filter, update)
    },
    /** This function is used to update multiple documents. */
    updateMany: async (collectionName, filter, input) => {
        database.db.collection(collectionName).updateMany(filter, input)
    },
    /** This function is used to delete logic. */
    deleteLogic: async (collectionName, filter) => {
        let input = {}
        input[Constants.Collections.Common.DeleteFlag] = 1
        input[Constants.Collections.Common.DeleteTime] = new Date().getTime() / 1000
        let update = buildUpdateFromInput(input)
        return await database.db.collection(collectionName).updateOne(filter, update)
    },
    // see http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOne
    createFindOptions: ({ skip = null, limit = null, projection = null, sort = null }) => {
        let options = {}
        options['skip'] = skip ? skip : null
        options['limit'] = limit ? limit : null
        options['projection'] = projection ? projection : null
        options['sort'] = sort ? sort : null
        return options
    },
    buildFilterById: id => {
        let filter = {}
        let notEqual = {}
        notEqual[Constants.DbKeywords.NotEqual] = Constants.Deleted
        filter[Constants.Collections.Common._ID] = ObjectId(id)
        filter[Constants.Collections.Common.DeleteFlag] = notEqual
        return filter
    }
}
module.exports = database
