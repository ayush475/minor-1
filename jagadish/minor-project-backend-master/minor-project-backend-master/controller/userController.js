
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/userModel");
const { filter } = require("../utils/auth");

exports.getAllUsers = async (req, res, next) => {
  const filterParams=await filter(req.query);
 User.findAll(filterParams).then(users=>{
    return res.status(200).json( {
        sucess:true,
        users:users
    })
 }).catch(err=>{
    console.log(err);
    next(new ErrorHandler(err));
 })
};

exports.createNewUser = (req, res, next) => {
  const { email, password ,name} = req.body;

  const user = User.build({ email: email, name:name, password: password });
  return user.save().then((user) => {
    console.log(user.toJSON());
    return res.status(200).json({
      sucess: true,
      message: "user created sucessfully",
    });
  }).catch(err=>{
    console.log(err);
    return next(new ErrorHandler(err));
  });
};

// exports.getMyProfile = (req, res, next) => {
//     const {token}=req.cookies;
//     const{ id,email}=req.user;
//     // console.log(token);
//     User.findByPk(id).then(user=>{
//         console.log(user);
//         return res.status(200).json({
//             sucess:true,
//             user:user
//         }
//         )
//     }).catch(err=>{
//         console.log(err);
//         next(new ErrorHandler(err));
//     })
  

//   };



exports.getUserDetails = (req, res, next) => {
  const { userId } = req.params;
  // console.log(token);
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorHandler("User doesnot exist", 404));
      }
      console.log(user.toJSON());
      return res.status(200).json({
        sucess: true,
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  // console.log(token);
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorHandler("User doesnot exist", 404));
      }
      // console.log(subject.toJSON());
      user.destroy().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `User deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.updateUserDetails = (req, res, next) => {
 console.log("cuns");
 const {userId}=req.params;
  const { email} = req.body;

  // console.log(userId);
  

  User.findByPk(userId)
    .then((user) => {
      console.log(user);
      user.email = email;
      return user.save().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `User updated sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};
