
const Note= require('../model/noteModel');
const { filter } = require('../utils/auth');
const ErrorHandler = require("../utils/errorHandler");


exports.getAllNotes= async (req, res, next) => { 
   const filterParams=await filter(req.query);

 Note.findAll(filterParams).then(notes=>{
    return res.status(200).json( {
        sucess:true,
        notes:notes
    })
 }).catch(err=>{
    console.log(err);
    next(new ErrorHandler(err));
 })
};

exports.createNewNote = (req, res, next) => {
  const { name,author,url,subjectId} = req.body;

  const note = Note.build({ name:name,author:author,subjectId:subjectId,url:url });
  return note.save().then((note) => {
    console.log(note.toJSON());
    return res.status(200).json({
      sucess: true,
      message: "note created sucessfully",
    });
  }).catch(err=>{
    console.log(err);
    return next(new ErrorHandler(err));
  });
};

exports.getNoteDetails = (req, res, next) => {
  
    const{ noteId}=req.params;
    // console.log(token);
    Note.findByPk(noteId).then(note=>{
    
        if(!note){
            next(new ErrorHandler("note doesnot exist",404))

        }
        console.log(note.toJSON());
        return res.status(200).json({
            sucess:true,
            note:note
        }
        )
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };


  exports.deleteNote = (req, res, next) => {
  
    const{ noteId}=req.params;
    // console.log(token);
    Note.findByPk(noteId).then(note=>{
    
        if(!note){
            next(new ErrorHandler("note doesnot exist",404));
        }
        // console.log(subject.toJSON());
        note.destroy().then(()=>{
            return res.status(200).json({
                sucess:true,
                message:`note deleted sucessfully`
            }
            )
        });
        
    }).catch(err=>{
        console.log(err);
        next(new ErrorHandler(err));
    })
  

  };

