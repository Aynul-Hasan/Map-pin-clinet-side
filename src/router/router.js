const express= require('express')
const router= express.Router()
const {getRequest}=require('../request/request')
const PinSchema= require('../models/pin')
const UserSchema=require('../models/user')
const bcryptjs= require('bcryptjs')
// const UserSchemas = require('../models/user')
require('../db/database')
// get pins
router.get('/pins',async(req,res)=>{
     try{
         const pins= await PinSchema.find()
        //  res.status(201).json(pins)
        res.status(201).send(pins)
        //  console.log(pins)
 
     }catch(err){
         console.log(err)
     }
})
// create new pin
router.post('/pin',async(req,res)=>{
    try{
        const {name,title,desc,rating,lat,long}=req.body
        const isFind= await UserSchema.findOne({name})
        if(!isFind||!title||!desc||!rating||!lat||!long){
            res.status(422).send({error:'fill the input fields',status:422})
        }
        const pin= new PinSchema({name,title,desc,rating,lat,long})
        const save= await pin.save()
        return res.status(201).send({msg:'saved'})

    }catch(err){
        res.status(422).send(err)

    }
})
// create new user

router.post('/sign',async(req,res)=>{
    try{
         const {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(422).send({error:"Please fill all input fields",status:'422'})
        }
        const isName= await UserSchema.findOne({name})
        const isFind=await UserSchema.findOne({email})
        // console.log(isFind)
        if(isFind||isName){
            return res.status(406).send({error:"this Information is already exist",status:'406'})
        }
        const user= new UserSchema({name,email,password})
        const save= await user.save()
        return res.status(201).send({msg:'account is created',status:'201'})
    }catch(err){
        console.log(err)
    }
})  
// login user
router.post('/log',async(req,res)=>{
    try{
    
        const {email,password}=req.body
        if(!email||!password){
            return res.status(422).send({error:"Fill the input fields" ,status:'422'})
        }
        const isExist = await UserSchema.findOne({email})
       
        if(!isExist){
            return res.status(406).send({error:"wrong information" ,status:'406'})
        }
        const isMatch=await bcryptjs.compare(password,isExist.password)
        if(!isMatch){
            return res.status(406).send({error:"wrong information" ,status:'406'})
        }else{
            return res.status(201).send({msg:"login successfull",status:'201',user:`${isExist.name}`})  
        }
    }catch(err){
        console.log(err)
    } 
})
// logout
router.get("/logout",(req,res)=>{
    res.status(200).send('logout seccess')
    
})

module.exports=router;