const express=require('express');
const db=require('./knexfile-config');
const bcrypt=require('bcryptjs');
const restricted=require('./restricted-middleware');


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
        req.session.loggedin=true,
         res.status(200).json('You have successfully logged in')
    } else {
        res.status(403).json('Incorrect username or password')
    }
    }catch(error){
    res.status(500).json({errorMessage: error})
     }
});

apiRouter.delete('/logout', (req,res)=>{
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                res.status(400),json(`Failed to log out`)
            }else{
                res.status(200).json('logged out')
            }
        })
    }
})

apiRouter.get('/', restricted, (req,res)=>{
    return db('user')
    .then(u=>res.status(200).json(u))
    .catch(err=>res.status(500).json(err))
})

module.exports=apiRouter;