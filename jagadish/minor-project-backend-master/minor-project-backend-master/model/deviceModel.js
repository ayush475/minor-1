const sequelize = require("../config/database");
const Subject = require("./subjectModel");
const { Sequelize , DataTypes, Model } = require('sequelize');
const Owner = require("./ownerModel");
const Route = require("./routeModel");
const Device = sequelize.define(
  "Device",
  {
    // Model attributes are defined here
    macAddress: {
      type: DataTypes.STRING,
    allowNull:false,
    unique:true,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: Owner, // 'M' would also work
          key: "id",
        },
        
      },
      routeId: {
        type: DataTypes.INTEGER,
         defaultValue:null,
         references: {
          model: Route, // 'M' would also work
          key: "id",
        },
        
      },
    },
  
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//   console.log(Owner === sequelize.models.Owner); // true

module.exports = Device;
