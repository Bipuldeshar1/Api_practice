import {User} from "../models/user.model.js";

import  Jwt  from "jsonwebtoken";

const userRegister= async(req, res) => {
    const{email,userName,password}= req.body;

    if(!email && !userName && !password){
      return res.send("all field mandatory for user reg")
    }

    const user= await User.create({
        email,
        userName,
        password,
    })

    return res.status(200).json(user);
}

const login= async(req, res) => {
    const{email,password,userName}= req.body;

    if(!userName && !password){
        return res.json("all field required")
    }
    const user= await User.findOne({userName})
  
    if(!user){
        return res.json(`no user found with username ${userName}`)
    }


    if(user.password != password){
        return res.json("psw mis match")
    }
    const accessToken =Jwt.sign({
        user:{
            userName:user.userName,
            email:user.email,
            id:user._id
        }
    },
    "asdf",
    {expiresIn:"15m"}
    )
    return res.status(200).json(accessToken);


}

const getCurrentUser= async(req, res) =>{
    return res.json(req.user);
}

const logoutUser =async(req, res) =>{
    await User.findByIdAndUpdate(
         req.user.id,
         {
             $unset:{
                 Token:1
             },
             
         },
         {
             new:true
         },
     )
   
 
      return res.
      status(200).
      
      json("user logged out successfully")
 }
export {userRegister, login, getCurrentUser,logoutUser}