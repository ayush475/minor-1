const sequelize = require("../config/database");
const Course = require("./busTravelModel");
const Subject = require("./subjectModel");
const { Sequelize , DataTypes, Model } = require('sequelize');

const CourseSyllabus = sequelize.define(
  "CourseSyllabus",
  {
    // Model attributes are defined here
    year:{
        type:DataTypes.FLOAT(2),
        allowNull:false,
        validate:{
         isFloat:true,
         min:0,
         max:10
        },
        set(value){
          this.setDataValue('year',value.toFixed(2));
        }
        
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: Course, // 'M' would also work
          key: "id",
        },
        
      },
   
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: Subject, // 'M' would also work
          key: "id",
        },
        
      },
     
    },
  
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

module.exports =CourseSyllabus;
