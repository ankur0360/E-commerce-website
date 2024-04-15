// schema for your server side validation


// step:1
const Joi = require('joi');

const productschema=Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.string().min(0).required(),
    desc:Joi.string().required(),
   
})

const reviewschema=Joi.object({
        rating:Joi.string().min(0).max(0).required(),
        comment:Joi.string().required(),


})

module.exports ={productschema, reviewschema}

