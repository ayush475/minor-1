
const ErrorHandler = require("../utils/errorHandler");
const Owner = require("../model/ownerModel");

exports.getAllOwners = async (req, res, next) => {
  const filterParams=await filter(req.query);
 Owner.findAll(filterParams).then(owners=>{
    return res.status(200).json( {
        sucess:true,
        owners:owners
    })
 }).catch(err=>{
    console.log(err);
    next(new ErrorHandler(err));
 })
};

exports.createNewOwner = (req, res, next) => {
  const { email, password ,name} = req.body;

  const owner = Owner.build({ email: email, name:name, password: password });
  return owner.save().then((owner) => {
    console.log(owner.toJSON());
    return res.status(200).json({
      sucess: true,
      message: "owner created sucessfully",
    });
  }).catch(err=>{
    console.log(err);
    return next(new ErrorHandler(err));
  });
};

// exports.getMyProfile = (req, res, next) => {
//     const {token}=req.cookies;
//     const{ id,email}=req.owner;
//     // console.log(token);
//     Owner.findByPk(id).then(owner=>{
//         console.log(owner);
//         return res.status(200).json({
//             sucess:true,
//             owner:owner
//         }
//         )
//     }).catch(err=>{
//         console.log(err);
//         next(new ErrorHandler(err));
//     })
  

//   };




