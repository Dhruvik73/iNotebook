const mongoose=require('mongoose')
const {Schema}=mongoose;
//creat a schema in mongoose database
const Userschema=new Schema(
    {name:{
        type:String,
        required:true
    },
     email: 
    {type:String,
     required:true,
     unique:true
    },
     password:{
         type:String,
         required:true 
         },
    date:{
        type:Date,
        default:Date.now
    }
}
)
module.exports=mongoose.model('users',Userschema)