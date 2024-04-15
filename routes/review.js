const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();
const Review =require('../Models/Review');
const { validateReview } = require('../middleware');


router.post('/products/:id/review',async(req, res)=>{
    // console.log(req.body);
    try{
    let {id}=req.params;
    let{rating,comment} = req.body;
    const product=await Product.findById(id);
    const review=new Review({rating,comment});

    product.reviews.push(review);
   await review.save();
   await product.save();
   req.flash('success', 'Review saved successfully');

   res.redirect(`/products/${id}`);
    }
   catch(err){
    res.status(500).render('error', {err:err.message});
   }
})

module.exports =router