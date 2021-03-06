const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cage = new Schema({
    cage_name:{
        type:String
    },

    cage_Hen:{
        type:Number
    },
    cage_Roo:{
        type:Number
    },
    cage_total:{
        type:Number
    }
})

module.exports = mongoose.model('cage', Cage)