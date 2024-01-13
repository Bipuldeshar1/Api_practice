import  Jwt   from "jsonwebtoken";
import {User} from "../models/user.model.js";
const validateToken = async(req,res,next) => {
    console.log(req.cookies?.accessToken);
    console.log(req.header('Authorization')?.replace("Bearer","").trim());
   
    const Token = req.cookies?.accessToken || (req.header('Authorization')?.replace("Bearer", "")).trim();

    if (!Token) {
        console.log("unauthorized access");
    } else {
        try {
            const decodedToken = Jwt.verify(Token, "aaaa");
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
            if (!user) {
                console.log("invalid access token user");
            } else {
                req.user = user;
                next();
            }
        } catch (error) {
            console.log("invalid access token");
        }
    }
}
    
export {validateToken}