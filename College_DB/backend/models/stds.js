var mongoose = require('mongoose');
var stdsSchema = new mongoose.Schema({
    enNo:{
        type:String
    },
    name:{
        type:String
    },
    department:{
        type:String
    },
    course:{
        type:String
    },
    batch:{
        type:String
    },
    sec:{
        type:String
    }
})
module.exports = mongoose.model('Stds', stdsSchema)