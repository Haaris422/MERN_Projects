var mongoose = require('mongoose');
var noticeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    notice:{
        type:String
    },
    department:{
        type:String
    }
})

module.exports = mongoose.model('notice', noticeSchema)