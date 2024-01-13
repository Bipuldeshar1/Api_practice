import {User} from "../models/user.model.js";

import  Jwt  from "jsonwebtoken";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken();
        const refreshToken= user.generateRefreshToken();

        user.refreshToken= refreshToken
        await user.save({ValiditBeforeSave: false})

        return{accessToken,refreshToken}
    } catch (error) {
        throw new Error("sth went wrong while generating refresha nd access token")
    }
}

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

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUSer = await User.findById(user._id).select("-password -refreshToken")
   
    const options ={
        httpOnly: true,
        secure:true,
     }
    
    return res.status(200).cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options).json(
        `${loggedInUSer}, refresh ${refreshToken}, access ${accessToken}`
    );


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
     const options ={
        httpOnly: true,
        secure:true,
     }
 
      return res.
      status(200).
      
      clearCookie("accessToken",options).
      clearCookie("refreshToken",options).
      json('logout success')
 }

 
export {userRegister, login, getCurrentUser,logoutUser}