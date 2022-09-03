const mongoose = require('mongoose');

const contentFireSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    age:{
        type:String,
        required:false
    },
    dept:{
        type:String,
        required:false
    },
    score:{
        type:String,
        required:false
    },
    grade:{
        type:String,
        required:false
    }


});

module.exports = mongoose.model('ContentFireSchema', contentFireSchema);