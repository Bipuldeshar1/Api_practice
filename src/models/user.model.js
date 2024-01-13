import  Jwt  from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema= mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
        },
        userName:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        refreshToken: {
            type:String
        },
    
    },{timestamps:true}
)


userSchema.methods.generateAccessToken = function()  {
    return Jwt.sign({
        _id: this._id,
    },
    "aaaa", //access token secret
    {
        expiresIn:"20000"
    }
    )

}

userSchema.methods.generateRefreshToken = function(){
    return Jwt.sign({
        _id:this._id,
    },
    "aaaa", //refresh token secret
    {
        expiresIn:"1d"
    }
    )
}
const User= mongoose.model("User", userSchema)

export {User}