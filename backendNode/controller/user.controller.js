const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let secretkey = process.env.secretkey;

const signup = (req,res)=>{
    const  {firstName,lastName,email,password} = req.body
    const user = new userModel({firstName,lastName,email,password});
    bcrypt.hash(password, 10, function(err, hash) {
        if(err){
            res.status(500).json({message:"User creation failed",err})
        }
        user.password = hash;
        user.save()
        .then((result)=>{
            res.status(201).json({message:"User created successfully",result})
        }).catch((err)=>{
            res.status(500).json({message:"User creation failed",err})
        })
    });
}
const signin = (req,res)=>{
    const {email,password} = req.body
    userModel.findOne({email})
    .then((users)=>{
        if(!users){
            res.status(404).json({message:"User not found"})
        }else{
            bcrypt.compare(password, users.password, function(err, result) {
                if(err){
                    res.status(500).json({message:"User not found",err})
                }
                if(result){
                     let token=jwt.sign({email},secretkey,{expiresIn: "1m"});
                    res.status(200).json({message:"User found",token})
                    console.log(token);
                    
                }else{
                    res.status(404).json({message:"User not found"})
                }
            });
        }
    })
}

const verifyToken = (req,res)=>{
    let toToken = req.body.token;
    jwt.verify(toToken,secretkey,(err,decoded)=>{
        if(err){
            res.status(500).json({message:"Token not verified",err})
        }else{
            res.send({decoded, message:"Token verified", status:200, toToken, valid:true})
        }
    })
}

module.exports = {signup,signin,verifyToken};