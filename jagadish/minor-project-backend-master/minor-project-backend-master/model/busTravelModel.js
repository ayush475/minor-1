const sequelize = require("../config/database");
const Device = require("./deviceModel");
const Owner = require("./ownerModel");
const { Sequelize, DataTypes, Model } = require("sequelize");
const User = require("./ownerModel");
// const { now } = require("sequelize/types/utils");
const BusTravel = sequelize.define(
  "BusTravel",
  {
    // Model attributes are defined hFere
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Device, // 'M' would also work
        key: "id",
      },
    },
    velocity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    stopLocation: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: null,
    },
    recentNodes: {
      type: DataTypes.JSON,          // 2d array one for location and another for imestamp
      allowNull: false,
      validate: {
        isNodeValid: function (value) {
          // console.log("llll");

          if (
            !value.hasOwnProperty("locationsWithTimeStamp") ||
            !Array.isArray(value.locationsWithTimeStamp) 
          ) {
            throw new Error(
              "Invalid preference: locationsWithTimeStamp property missing or locationWithTimeStamp must be 2d array"
            );
          }
        },
      },
    },
    // passangers:
    //   {
    //     type: DataTypes.JSON,
    //     defaultValue:[],
    //   }
  },

  {
    // Other model options go here
  }
);

// BusTravel.belongsToMany(User, { through: "passangers" });
// User.belongsToMany(BusTravel, { through: "passangers" });

// `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

module.exports = BusTravel;
