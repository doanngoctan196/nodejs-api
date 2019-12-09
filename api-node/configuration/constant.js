/** Application Constants */
const Constants = Object.freeze({
    /** This field indicates that item was deleted in database. */
    Deleted: 1,
    /** This field indicates that item was modified in database. */
    ModifiedSuccess: 1,

    DbKeywords: Object.freeze({
        NotEqual: '$ne',
        Set: '$set'
    }),
    Collections: Object.freeze({
        // Common fields
        Common: Object.freeze({
            _ID: '_id',
            DeleteFlag: 'deleteFlag',
            UpdateTime: 'updateTime',
            DeleteTime: 'deleteTime',
            InsertTime: 'insertTime'
        })
    })
})
module.exports = Constants
