// Authorization k liye user ka schema 

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema= new mongoose.Schema({ // yha pr password and username ye automatically deta h 
    email:{
        type:String,
        trim:true,
        required:true
    },
   role:{        //buyer or sheller
    type:String,
    required:true
   },

   cart:[          // hr user ki ek alag cart hogi and hr cart mai product honge(means ids hogi)
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }

    ]
})
userSchema.plugin(passportLocalMongoose);   // PLM ki propety use krne k liye 


let User = mongoose.model('User', userSchema);

module.exports = User   //jha operation kruga bha pr bheja h ye schema