const { NotBeforeError } = require('jsonwebtoken');
const Device = require('../model/deviceModel');
const Course = require('../model/busTravelModel');
const Note = require('../model/noteModel');
const Subject = require('../model/subjectModel');
const Owner=require('../model/ownerModel');
const CourseSyllabus=require('../model/courseSyllabusModel');
const User = require('../model/userModel');
const BusTravel = require('../model/busTravelModel');
const Route = require('../model/routeModel');
const UserTravel = require('../model/userTravelModel');


exports.updateAllModelSchema=async(req,res,next)=>{

  await  Owner.sync({force:true});
  await Route.sync({force:true});
  await Device.sync({force:true});
  await User.sync({force:true});

  await  BusTravel.sync({force:true});
  await UserTravel.sync({force:true});





  // await  User.sync({force:true});
 
  
 
  // await Book.sync({force:true});
  // await Note.sync({force:true});
  // await CourseSyllabus.sync({force:true});
  

  return res.status(200).json({
    sucess:true,
    message:"all models updated sucessfully"
  });
}