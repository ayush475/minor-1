const sequelize = require("../config/database");
const Subject = require("./subjectModel");
const { Sequelize, DataTypes, Model, ARRAY } = require("sequelize");
const Owner = require("./ownerModel");
const Route = sequelize.define(
  "Route",
  {
    nodes: {
      type: DataTypes.JSON,
      allowNull:false,
      validate: {
        
        isRouteValid: function (value) {
            console.log("llll");

          if (
            !value.hasOwnProperty("locations") ||
       ! Array.isArray(value.locations)
          ) {
            throw new Error(
              "Invalid preference: locations property missing or location must be array"
            );
          }
        },
      },
    },
  },

  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//   console.log(Owner === sequelize.models.Owner); // true

module.exports = Route;
