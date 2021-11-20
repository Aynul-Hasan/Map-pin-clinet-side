const mongoose= require('mongoose')
const bcryptjs=require('bcryptjs')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:10  
      },
    email:{
       type:String,
       required:true,
       unique:true    
    },
    password:{
        type:String,
        required:true,
        min:6
    }
},{timestamps:true})



userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcryptjs.hash(this.password, 10)
    }
    next()
})


const UserSchemas= new mongoose.model('user',userSchema)
module.exports=UserSchemas;