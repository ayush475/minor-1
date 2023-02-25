const User = require("../model/userModel");
const { decodeToken } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");

exports.authenticateUser =async (req, res, next) => {
    const {token}=req.cookies;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("sign in first",401));
    }

    decodedToken= await decodeToken(token);
    if(!decodeToken){
        return next(new ErrorHandler("token expired! sign in again",401));
    }
    console.log(decodedToken);

    User.findOne({id:1}).then(user=>{
        req.user={
            id:user.id,
            email:user.email,
            role:user.role
        }
        next();
    }
        ).catch(err=>{
            console.log(err);
            next(new ErrorHandler(err));
        })
  

  };


// for bus minor project
exports.requiredToken=(req,res,next)=>{
const {authorization}=req.headers;
   console.log(authorization);
   next();
}