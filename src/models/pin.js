const mongoose=require('mongoose')


const pinSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        min:3
    },
    desc:{
        type:String,
        required:true,
        min:5
    },
    rating:{
        required:true,
        type:Number,
        min:0,
        max:5
    },
    lat:{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    }

},{timestamps:true})

const PinSchema=new mongoose.model('pin',pinSchema)
module.exports= PinSchema;