const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    } ,
    enddate:{
        type:Date,
        required:true
    }
});

module.exports =mongoose.model('Event',eventSchema);