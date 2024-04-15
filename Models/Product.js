const mongoose = require("mongoose");
const Review=require("./Review");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //extra space trim kr dega
        required: true    //true means it is compulsory name dena compulsory h
    },
    img: {
        type: String,
        trim: true,
        // default:
    },
    price: {
        type: Number,
        min: 0,     // price negative mai nhi ho skte minimum 0 kr do
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,       // review ki object id store kr rhe h
            ref:'Review'    //object id review k schema sai utha ni h 
        }
    ],
    author:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }

})

// middleware jo BTS mongodb operations karbane pr use hota h and iske andar pre and post middleware hote which are basically used over the schema and  before the the model

productSchema.post('findOneAndDelete',  async function(product){ //second way of delete review
    if(product.reviews.length>0){
     await   Review.deleteMany({_id:{$in:product.reviews}})
    }
})



let Product = mongoose.model('Product', productSchema)

module.exports = Product   //jha operation kruga bha pr bheja h ye schema