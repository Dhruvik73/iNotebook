const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Notes=require('../models/Notes');
 //fetch all notes for a particuler user id
router.get('/fetchnote',fetchuser,async (req,res)=>{
     const note=await Notes.find({user:req.user.id});
     res.json(note);
})
//add note and give it to user id
router.post('/addnote',[
     body('title','enter valid title').isLength({min:5}),
     body('description','enter valid description').isLength({min:5}),
 ],fetchuser, async (req,res)=>{
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
      const {title,description,tag}=req.body;
      try {
          const note=new Notes({
               title,description,tag,user:req.user.id
          }) 
          const savednote= await note.save();
          res.json(savednote);
      } catch (err) {
          console.log(err)
          res.status(500).json({error:'some error accured'}) 
      }
 })

 router.put('/updatenote/:id',fetchuser, async (req,res)=>{
try{
  const {title,description,tag}=req.body;
   const  newnote={};
  if(title){newnote.title=title} 
  if(description){newnote.description=description} 
  if(tag){newnote.tag=tag}      
  let notes=await Notes.findById(req.params.id);
  if(!notes){
       res.status(401).send('not found')
  }
 else if(notes.user.toString()!==req.user.id){
     res.status(401).send('not allowed')  
  }
  else{
   notes= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({notes})
}
}catch (err) {
    console.log(err)
    res.status(500).json({error:'some error accured'}) 
}
 }) 
 router.delete('/deletenote/:id',fetchuser, async (req,res)=>{ 
     try{ 
   let notes=await Notes.findById(req.params.id);
   if(!notes){
        res.status(401).send('not found')
   }
  else if(notes.user.toString()!==req.user.id){
      res.status(401).send('not allowed')  
   }
   else{
     notes= await Notes.findByIdAndDelete(req.params.id)
     res.json({success:`note with id: ${req.params.id} has been deleted`})
 }
     }
     catch (err) {
        console.log(err)
        res.status(500).json({error:'some error accured'}) 
    }
 })
module.exports=router