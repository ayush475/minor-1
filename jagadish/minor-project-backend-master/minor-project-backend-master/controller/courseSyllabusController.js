
const CourseSyllabus= require('../model/courseSyllabusModel');
const { filter } = require('../utils/auth');
const ErrorHandler = require("../utils/errorHandler");


exports.getAllCourseSyllabus= async (req, res, next) => { 
   const filterParams=await filter(req.query);

 CourseSyllabus.findAll(filterParams).then(syllabus=>{
    return res.status(200).json( {
        sucess:true,
        syllabus:syllabus
    })
 }).catch(err=>{
    console.log(err);
    next(new ErrorHandler(err));
 })
};

exports.createNewCourseSyllabus= (req, res, next) => {
  const { year,courseId,subjectId} = req.body;

  const syllabus = CourseSyllabus.build({year:year,courseId:courseId,subjectId:subjectId });
  return syllabus.save().then((syllabus) => {
    console.log(syllabus.toJSON());
    return res.status(200).json({
      sucess: true,
      message: "course syllabus created sucessfully",
    });
  }).catch(err=>{
    console.log(err);
    return next(new ErrorHandler(err));
  });
};

exports.getCourseSyllabusDetails = (req, res, next) => {
  
    const{ courseSyllabusId}=req.params;
    // console.log(token);
    CourseSyllabus.findByPk(courseSyllabusId).then(syllabus=>{
    
        if(!syllabus){
            next(new ErrorHandler("course syllabus doesnot exist",404))

        }
        console.log(syllabus.toJSON());
        return res.status(200).json({
            sucess:true,
            syllabus:syllabus
        }
        )
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };


  exports.deleteCourseSyllabus = (req, res, next) => {
  
    const{ courseSyllabusId}=req.params;
    // console.log(token);
    CourseSyllabus.findByPk(courseSyllabusId).then(syllabus=>{
    
        if(!syllabus){
            next(new ErrorHandler("course syllabus doesnot exist",404));
        }
        // console.log(subject.toJSON());
        syllabus.destroy().then(()=>{
            return res.status(200).json({
                sucess:true,
                message:`course syllabus deleted sucessfully`
            }
            )
        });
        
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };

