const Product = require('./Models/Product');

// step 2: schema validate h ya nhi
const {productSchema,reviewSchema} = require('./schema');

const validateProduct=(req, res, next) => {
    const {name,img,price,desc}=req.body;
    const {error} =productSchema.validate({name,img,price,desc});
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview=(req, res, next) => {
    const {rating,comment}=req.body;
    const {error} =reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error');
    }
    next();
}

// koi login h ya nhi 
const isloggedin=((req, res, next) => {
    if(!req.isAuthenticated()){         // ye ek property h jo boolean return kregi 
        req.flash('error','please login first')
        return res.redirect('/login');
    }  
    next();                      
})


// middleware for checking seller or buyer

const isSeller =(req,res,next)=>{
    if(!req.user.role){   // let's kisi k pass koi role he nhi h tou bhi usko kuch na krne du
        req.flash('error','you dont"t have the permissions to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !=='seller'){     // agar buyer h tou bhi kuch na kr ske only product ko buy kr ske
        req.flash('error','you dont"t have the permissions to do that');
        return res.redirect('/products');
    }
    next();
}

// jis product ko jis seller nai add kiya h bo delete kr paye only iske k liye middleware

const isproductAuthor= async(req,res,next)=>{
 let {id} =  req.params    // product ki id 
 let product=  await Product.findById(id);   //ye mera product mil gya
    if(!product.author.equals(req.user._id) ){
        req.flash('error','you are not authorized user');
        return res.redirect('/products');
    }
    next();
}

module.exports ={isproductAuthor,isSeller,isloggedin,validateReview,validateProduct};