const express=require('express');
const db=require('./knexfile-config');
const bcrypt=require('bcryptjs');


const apiRouter=express.Router();

apiRouter.post('/register', async (req,res)=>{
    try{
        const user=req.body;
        const hashpass=bcrypt.hashSync(user.password,5)
        user.password=hashpass;
        const id=await db('user').insert(user);
        res.status(201).json(`Successfully created your account with id: ${id}`);
    }catch(error){
        res.status(500).json(error)
    }
});

apiRouter.post('/login', async (req,res)=>{
    
  try {
    const {username,password} = req.body;
    const userData= await db('user').where({username}).first();
    if(userData && bcrypt.compareSync(password,userData.Password)){
         res.status(200).json('You have successfully logged in')
    } else {
        res.status(403).json('Incorrect username or password')
    }
    }catch(error){
    res.status(500).json({errorMessage: error})
     }
});



module.exports=apiRouter;