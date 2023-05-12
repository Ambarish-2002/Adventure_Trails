const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Our schema
const reviewSchema = new Schema({
    body:String,
    rating:Number,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    
});

// Exporting it to be Used
module.exports = mongoose.model('Review',reviewSchema)