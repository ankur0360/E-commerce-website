const mongoose = require('mongoose');

const product=require('./Models/Product');

const products=[
    {
        name:"IPhone 15pro",
        img:"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        price:150000,
        desc:"very costly"
    },
    {
        name:"MacBook m2 pro",
        img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price:250000 ,
        desc:"too muchhh constly"

    },
    {
        name:"IWatch",
        img:"https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SXdhdGNofGVufDB8fDB8fHww" ,
        price:50000 ,
        desc:"ye tou le skta hu "
    },
    {
        name:"Ipad pro",
        img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price: 345699,
        desc:"itna tou jatin sharemarket sai roj nikal deta"
    },
    {
        name:"Airpods",
       img:"https://images.unsplash.com/photo-1628773193539-ad29c647c071?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEFpcnBvZHN8ZW58MHx8MHx8fDA%3D",
        price:25000 ,
        desc:"aman ki ek min ki kamai"
    },
]

async function seedDB(){
  await  product.insertMany(products);           //it also return  promises  that's why use async function. DB k sath kam hoga tou kuch na kuch tym lgega isiliye await
    console.log("data seeded successfully");
}

module.exports = seedDB;
