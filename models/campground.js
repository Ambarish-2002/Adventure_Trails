const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./review')

const imageSchema = new Schema({
    url:String,
    filename:String 
});
imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200,h_200');
});

const opts = {toJSON:{virtuals:true}}
//Our schema
const CampGroundsSchema = new Schema({
    title:String,
    images:[imageSchema],
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts);

CampGroundsSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>`
});

// mongoose middleware
CampGroundsSchema.post('findOneAndDelete',async function(doc){
    if(doc)
    {
        await Review.deleteMany({_id:{$in:doc.reviews}})
    }
})


// Exporting it to be Used
module.exports = mongoose.model('CampGround',CampGroundsSchema)
