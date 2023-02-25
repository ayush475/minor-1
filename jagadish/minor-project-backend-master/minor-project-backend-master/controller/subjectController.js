const Subject = require("../model/subjectModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllSubjects = async (req, res, next) => {

  const filterParams=await filter(req.query);
  Subject.findAll(filterParams)
    .then((subjects) => {
      return res.status(200).json({
        sucess: true,
        subjects: subjects,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.createNewSubject = (req, res, next) => {
  const { name, code } = req.body;

  const subject = Subject.build({ name: name, code: code });
  return subject
    .save()
    .then((subject) => {
      console.log(subject.toJSON());
      return res.status(200).json({
        sucess: true,
        message: "subject created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err));
    });
};

exports.getSubjectDetails = (req, res, next) => {
  const { subjectId } = req.params;
  // console.log(token);
  Subject.findByPk(subjectId)
    .then((subject) => {
      if (!subject) {
        next(new ErrorHandler("subject doesnot exist", 404));
      }
      console.log(subject.toJSON());
      return res.status(200).json({
        sucess: true,
        subject: subject,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteSubject = (req, res, next) => {
  const { subjectId } = req.params;
  // console.log(token);
  Subject.findByPk(subjectId)
    .then((subject) => {
      if (!subject) {
        next(new ErrorHandler("Subject doesnot exist", 404));
      }
      console.log(subject.toJSON());
      subject.destroy().then((subject) => {
        return res.status(200).json({
          sucess: true,
          message: `subject with  deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};
