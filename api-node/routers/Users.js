const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type :String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        maxlength : 10,
        required : true,
        unique : true
    },
    birthday :{
        type : String,
        required : true
    },
    cmnd : {
        type : String,
        maxlength : 10,
        required : true
    },
    address : {
        type : String,
    },
    income : {
        basic : {
            type : Number,
            min : 0,
            max : 10000000
        },
        gold : {
            type : Number,
            min : 10000000,
            max : 20000000
        },
        premium : {
            type : Number,
            min : 20000000
        }
    }
});
module.exports = mongoose.model('Users', userSchema);