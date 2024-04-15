// Authentication k liye routes

const express=require('express');
const passport = require('passport');
const User = require('../Models/User');
const router=express.Router();


// to show the form of signup
router.get('/register', (req, res) => {
    res.render('auth/Signup');
});

// actually want to register a user in my DB
router.post('/register',async (req, res) => {
    try{
   let {email,password,username,role}= req.body;
  const user= new User({email,username,role})                //new user for register method
  const newUser= await User.register(user,password);    // ye dB k sath kam krega and new user create krega
    // res.send(newuser);
    // res.redirect('/login');      // yha pr register krte he login krna pdega pehle
    req.login(newUser,function(err){   // it is a method:register krte he sidhe home pr ja ske 
        if(err){
            return next(err)
        }
        req.flash('success','welcome ');
        return res.redirect('/products');
    }) 
} 
  catch(err){
        req.flash('error',err.message);
        res.redirect('/register');
  }            

});

//to get login form
router.get('/login', (req, res) => {
        res.render('auth/login');
})

// to actually login via the DB
router.post('/login',                          // pehle authentication check hogi then login hoga
passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureMessage: true 
}),
 (req, res) => {      
    req.flash('success','Welcome back') ;
    res.redirect('/products');

});

// logout 
router.get('/logout',(req, res) => {
    ()=>{
        req.logout();
    }
    req.flash('success','goodbye friends,see you again');
    res.redirect('/login');
})


module.exports = router
