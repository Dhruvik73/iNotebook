const mongoose=require('mongoose')
const {Schema}=mongoose;
//creat a schema in mongoose database
const Noteschema=new Schema(
    {user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    },
     description: 
    {type:String,
     required:true
    },
     tag:{
         type:String,
         default:'general'
         },
    date:{
        type:Date,
        default:Date.now
    }
}
)
module.exports=mongoose.model('notes',Noteschema)