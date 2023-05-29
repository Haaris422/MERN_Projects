var mongoose = require('mongoose')
var photoSchema = new mongoose.Schema({
    enNo:{
        type:String
    },
    pp:{
        type:String
    },
    libCard:{
        type:String
    },
    idCard: {
        type:String
    }
},
)
module.exports = mongoose.model('photos', photoSchema)