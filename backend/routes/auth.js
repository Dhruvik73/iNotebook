const express=require('express')
const router=express.Router();
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const JWT_SECRET='dhruvik$boy';
//creat a user and send it in data base :route:1
router.post('/creatuser',[
    body('email','enter valid email').isEmail(),
    body('password','enter valid password').isLength({ min: 8 }),
    body('name','enter valid name').isLength({ min: 3 }),
], async (req,res)=>{
    let success=true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user= await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({errors:'sorry, user is allready exists'})
        success=false;
    }
     const salt= await bcrypt.genSalt(10);
     const secpass=await bcrypt.hash(req.body.password,salt);
     user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secpass
      })
      
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err),
    //       res.json({errors:'please enter unique value for email',message:err.message})
    //   })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    res.json({success,authtoken})
}catch(err){
    console.log(err)
    success=false;
    res.status(500).json({error:'some error accured'})
    }
})
//logined user by confirm password and email:route 2
router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','pasword is not correct').exists(),
], async (req,res)=>{
    let success=true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      success=false;
    }
    try{ 
  const{email,password}=req.body;
  let user= await User.findOne({email});
  if(!user){
     return res.status(500).json({error:'please enter correct details'})
     success=false;
  }
  const pass=await bcrypt.compare(password,user.password)
  if(!pass){
    return res.status(500).json({error:'please enter correct details'}) 
    success=false;
  }
  const data={
    user:{
        id:user.id
    }
}
const authtoken=jwt.sign(data,JWT_SECRET)
res.json({success,authtoken})

}catch(err){
      res.json({error:'some internel server error'})
      success=false;
  }
})
//fetch user by using a authtoken and middleware:route 3
router.post('/fetchuser',fetchuser,async (req,res)=>{
    let success=true;
try {
    const userid=req.user.id;
    const user=await User.findById(userid).select('-password')
    res.send(user,success)
}catch(err){
    console.log(err)
    res.status(500).json({error:'some error accured'})
    success=false;
    } 
})
module.exports=router