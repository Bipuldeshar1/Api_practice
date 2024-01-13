import  Jwt   from "jsonwebtoken";
const validateToken = async(req,res,next) => {
    let Token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        Token =authHeader.split(" ")[1];
        if(!Token){
            res.status(400)
            throw new Error('unauthorized');
        }
        Jwt.verify(Token,"asdf",(err,decoded) => {
            if(err){
                res.status(400)
                throw new Error("user not authorized or session expired");
            }
            else{
                console.log(decoded);
                req.user = decoded.user;
                next();
            }
        })
      
        
        
    }
}
export {validateToken}