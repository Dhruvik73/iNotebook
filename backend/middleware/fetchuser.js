const jwt=require('jsonwebtoken');
const JWT_SECRET='dhruvik$boy';
//a middleware to compare user authtoken
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:'please retry with your real token'})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next()
    }catch(err){
        res.status(401).send({error:'please retry with your real token'})
    }
}
module.exports=fetchuser