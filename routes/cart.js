// cart k liye routes  

const express = require('express');
const { isloggedin } = require('../middleware');    // login tou hona chaheiye cart k liye
const Product = require('../Models/Product');
const User = require('../Models/User');
const router = express.Router();

// route to see the cart

router.get('/user/cart',isloggedin, async (req, res) => {
     let user=await  User.findById(req.user._id).populate('cart');     // current logged in user pta chal gya
     res.render('cart/cart',{user});    // logged user ko bheja hai 
})




// actually adding the product to the cart
router.post('/user/:productId/add',isloggedin,async (req, res) =>{
    let {productId}  =req.params;
    let userId=req.user._id;
 let product= await  Product.findById(productId);
 let user= await  User.findById(userId);
 user.cart.push(product);
 await user.save();
 res.redirect('/user/cart')
})













module.exports =router