// server k liye express ki need hogi 

const express = require('express');
const Product =require('../Models/Product');
const router = express.Router();
const Review=require('../Models/Review');

const {validateProduct,isloggedin,isSeller,isproductAuthor} = require('../middleware');
// RESTful routes implementation

// task 1-to show all the products
router.get('/products',async (req, res) => {
   try{                                            // route jo fatt jata h uske liye ye try and catch ka use kr rhe h
 let products =  await Product.find({});
    res.render('products/index',{products});
   }
   catch(err){
      res.status(500).render('error',{err:e.message});
   }
})


// task 2-to show the form for new products
 router.get('/products/new', isloggedin,(req, res)=>{
   try{
    res.render('products/new');
   }
    catch(err){
      res.status(500).render('error',{err:e.message});
   }
 })


//  task 3 - actually add the product by form
router.post('/products',isloggedin,isSeller,async(req, res)=>{
   try{   
     let{name,img,price,desc}=req.body;
   await  Product.create({name:name,img:img,price:price,desc,author:req.user._id}); //DB mai bhi tou new product add hoga 
   req.flash('success','  Product added successfully.');
   res.redirect('/products');  
   }
   catch(err){
      res.status(500).render('error',{err:e.message});
   }
});

// task 4- show aa particular product 
router.get('/products/:id',isloggedin,async (req, res)=>{
   try{
   let {id}= req.params;
    let foundProduct=await Product.findById(id).populate('reviews');      //DB method  for finding product by that id
    res.render('products/show',{foundProduct,msg:req.flash('msg')})
   }
    catch(err){
      res.status(500).render('error',{err:e.message});
   }
})

// task 5- form to edit the product 
router.get('/products/:id/edit', isloggedin,async (req, res)=>{
   try{

        let{id}= req.params;
        let foundProduct=await Product.findById(id);
        res.render('products/edit',{foundProduct});
}
        catch(err){
         res.status(500).render('error',{err:e.message});
      }
})

//task 6- to actually added eidt data in DB

router.patch('/products/:id',isloggedin, async (req, res)=>{
   try{
    let {id}= req.params;
    let{name,img,price,desc}=req.body;
   await Product.findByIdAndUpdate(id,{name,img,price,desc});    //mongoose method
      req.flash('success','  Product edited successfully.');
   res.redirect(`/products/${id}`);    // jisko edit kiya us particular ko show krne l k liye
   }
   catch(err){
      res.status(500).render('error',{err:e.message});
   }
})

// task 7:- Delete the particular product and iske liye index.ejs mai ek form bnega 

router.delete('/products/:id',isloggedin,isproductAuthor,async (req, res)=>{
   try{
   let {id}=req.params;
   const product= await Product.findById(id);   //product ko find kr rhe h kyuki product k delete sai pehle product k andar jakr reviews ko delete krna h
   
   // for(let id of product.reviews){
   //    await Review.findByIdAndDelete(id);  first way of delete review
   // }
 await Product.findByIdAndDelete(id);   // ye bala method findoneanddelete middleware chla rha hoga
 req.flash('success','  Product deleted successfully.');
 res.redirect('/products'); 
   }
   catch(err){
      res.status(500).render('error',{err:e.message});
   }
})

module.exports = router;