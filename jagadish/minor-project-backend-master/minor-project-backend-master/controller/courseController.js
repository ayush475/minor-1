
const { where } = require("sequelize");
const Course = require("../model/busTravelModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");


exports.getAllCourses= async (req, res, next) => {
  const filterParams=await filter(req.query);
  // console.log(filterParams);
 Course.findAll(filterParams).then(courses=>{
    return res.status(200).json( {
        sucess:true,
        courses:courses
    })
 }).catch(err=>{
    console.log(err);
    next(new ErrorHandler(err));
 })
};

exports.createNewCourse = (req, res, next) => {
  const { name,description,level,type,duration} = req.body;

  const course = Course.build({ name:name,description:description,level:level,duration:duration,type:type });
  return course.save().then((course) => {
    console.log(course.toJSON());
    return res.status(200).json({
      sucess: true,
      message: "course created sucessfully",
    });
  }).catch(err=>{
    console.log(err);
    return next(new ErrorHandler(err));
  });
};

exports.getCourseDetails = (req, res, next) => {
  
    const{ courseId}=req.params;
    console.log(courseId);
    // console.log(token);
    Course.findByPk(courseId).then(course=>{
    
        if(!course){
            next(new ErrorHandler("course doesnot exist"))
        }
        console.log(course.toJSON());
        return res.status(200).json({
            sucess:true,
            course:course
        }
        )
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };


  exports.deleteCourse = (req, res, next) => {
  
    const{ courseId}=req.params;
    // console.log(token);
    Course.findByPk(courseId).then(course=>{
     
        if(!course){
            next(new ErrorHandler("course doesnot exist",404));
        }
      
        course.destroy().then(course=>{
        
            return res.status(200).json({
                sucess:true,
                message:`course with  deleted sucessfully`
            }
            )
        });
        
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  };






