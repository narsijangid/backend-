  //narsiji ye hai auth ke liye ab sabje phele JWT install karna hai npm i jsonwebtoken 
  //hash password ke lye phele npm install bcrypt karo fir hash ka login lagaoo narsi ji
  const fs = require("fs")
  const data = JSON.parse(fs.readFileSync('data.json')) 
  const mongoose = require('mongoose');
  require('dotenv').config()
  const cors = require('cors')
  const jwt = require('jsonwebtoken')
  const authcontroller = require('./Controll/auth')
  const router = require('./Router/users')


  
  main().catch(err => console.log(err));

  async function main() {
    await mongoose.connect('mongodb+srv://narsijangid01:12345678nj@cluster0.x8tzdfv.mongodb.net/ecommerce');
  console.log(process.env.SuccessStatus)
  }

  

  const express = require('express');
  const Server = express()



const auth = ((req,res,next)=>{
  let token = req.get('Authorization').split("Bearer ")[1]


  try{
    var decoded = jwt.verify(token,'shhhh');
    console.log(decoded)
    if(decoded.email){
      next()
    }
    else{
      res.sendStatus(401)
    }
  }

catch(error){
  res.sendStatus(401)
}

})



  Server.use(cors())
  Server.use(express.json());
  Server.use('/', router) 
  Server.use('/auth',authcontroller.createuser)





  Server.listen(2009, ()=>{
      console.log("Server has been started !!")
  })

  // ✨
  // Ab agar tereko fronted ko backend me merge karna hai to tunko frontend me build command run karte uska build folder bana le "phele check kar le build chal rha hai kua . phele cd build kar fir usme ye command chala ek bar npm i -g http-server .ab liko http-server to ye open hoga live servver par ye bas check karne ke liye hai" jo build hai na usko backend ke public folder gusaa de 