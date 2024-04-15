const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const session= require('express-session');
const passport= require('passport');
const LocalStrategy = require('passport-local');
const User= require('./Models/User');     // schema  ko require kr rhe h




const  productRoutes= require('./routes/product');
const  reviewRoutes= require('./routes/review');
const  authRoutes= require('./routes/auth');
const cartRoutes= require('./routes/cart');



mongoose.connect('mongodb://127.0.0.1:27017/Shopping-ayush-app')

.then(()=>{
        console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB is not connected".err);
})

app.engine('ejs',ejsMate); // templating engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); // views folder
app.use(express.static(path.join(__dirname,'public')));    // public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({    // session ka middleware
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,       // http pr kam krna h 
        expires:Date.now()+24*7*60*60*1000 ,           // current date hoti h 
        maxAge: 24*7*60*60*1000

    }
}))
app.use(flash());  // flash ka middleware



app.use(passport.initialize()); //passport ki cheezo ko use krne k liye
app.use(passport.session()); // localy store krne k liye 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{    // locals middleware for flash 
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next();
})

// PASSPORT:- mai local strategy ka use kr rha hu ye bta rhe h yha pr.
passport.use(new LocalStrategy(User.authenticate()));




//Seeding Database
// nodemon lga h isilye bar bar function run hoga and dubplicat data enter ho jaygea
// seedDB();



app.use(productRoutes); // hrr ek incoming request k liye path check kiya jaye
app.use(reviewRoutes); // hrr ek incoming request k liye path check kiya jaye
app.use(authRoutes); // auth routes ka middleware
app.use(cartRoutes); // cart routes ka middleware

 

app.listen(8081,() => {
    console.log("server connected at port at 8080")
})