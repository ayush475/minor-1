const sequelize = require("../config/database");
const Subject = require("./subjectModel");
const { Sequelize, DataTypes, Model, INTEGER } = require("sequelize");
const Owner = require("./ownerModel");
const Route = require("./routeModel");
const User = require("./userModel");
const BusTravel = require("./busTravelModel");
const UserTravel = sequelize.define(
  "UserTravel",
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // 'M' would also work
        key: "id",
      },
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    destinationLocation: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    busTravelId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: BusTravel, // 'M' would also work
        key: "id",
      },
    },
    distanceTravelled: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    priceRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },

  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//   console.log(Owner === sequelize.models.Owner); // true

module.exports = UserTravel;
