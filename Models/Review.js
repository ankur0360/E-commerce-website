const mongoose = require('mongoose');

const reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
},
    {timestamps:true});     //review kb diya uss time k liye 


let Review = mongoose.model('Review', reviewSchema)

module.exports = Review   //jha operation kruga bha pr bheja h ye schema