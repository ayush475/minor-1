const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const { param } = require("../routes/courseRoutes");
const { filter, jointParamFilter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");

exports.getJointTableDetails = async (req, res, next) => {
  //  const {subjectId,courseId,year}=req.query;
  //  console.log(req.query);
  const params = jointParamFilter(req.query);
  // console.log(params);
  let query = `select * from "CourseSyllabuses" as c inner join "Subjects" as s 
on c."subjectId"=s."id"
inner join "Courses" as cs
on c."courseId"=cs."id"
${params};  `;

  sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then((data) => {
      return res.status(200).json({
        sucess: true,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};
