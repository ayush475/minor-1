const User = require("../model/userModel");
const { sendToken } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");

exports.login=(req,res,next)=>{
    const{email,password}=req.body;
    User.scope('withPassword').findOne({ where: { email:email } }).then(user=>{
      if(!user){
        next(new ErrorHandler("user doesnot exist",404));
      }
      if(user.comparePassword(password)===true) {
        sendToken(user,res,200)
        return res.status(200).json({
            sucess:true,
            message:"login sucessful"
        });
      }else{
        next(new ErrorHandler("email and password doesnot match",401));
      }
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err))
    })
}

exports.logOut = (req, res,next) => {
  
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({
      sucess: true,
      message: "logged out sucessfully",
    });
  };


  exports.increaseVirtualCoin = (req, res, next) => {
  
    const{id}=req.params;
    // console.log(token);
    User.findOne({id:id}).then(user=>{
        user.increaseCoin();
         user.save().then(updatedUser=>{
            return res.status(200).json({
                sucess:true,
                user:updatedUser
            }
            )
         })
        
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };


  exports.changePassword=(req,res,next)=>{

    const{oldPassword,newPassword}=req.body;
  
    const userId=req.user.id;
    if(!oldPassword || !newPassword){
   return   next(new ErrorHandler("please provide old and new password",400))
    }

  return  User.scope('withPassword').findByPk(userId).then(async(user)=>{
      if(!user){
        next(new ErrorHandler("user doesnot exist",404));
      }
      console.log(user.toJSON());
      console.log(oldPassword);
      if ( user.comparePassword(oldPassword)===true){
    
        user.password=await user.hashPassword(newPassword);
        await user.save();
        sendToken(user,res,400);
        
        return res.status(200).json({
          sucess:true,
          message:"password changed sucessfully"
          
        })
    
      }else{
        next(new ErrorHandler("password doesnto match",401));
      }
    
    }).catch(err=>{
      console.log(err);
      next(new ErrorHandler(err));
    }); 

  }