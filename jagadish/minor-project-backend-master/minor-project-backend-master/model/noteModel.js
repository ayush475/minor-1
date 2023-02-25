const sequelize = require("../config/database");
const Subject = require("./subjectModel");
const { Sequelize , DataTypes, Model } = require('sequelize');

const Note = sequelize.define(
  "Note",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    allowNull:false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
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
      url: {
        type:DataTypes.STRING,
        defaultValue:"" 
      },
    },
  
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

module.exports = Note;
