const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Sequelize, DataTypes, Model } = require("sequelize");
const { hashPassword } = require("../utils/auth");
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Enter a valid email address",
        },
        notEmpty: true,
        notNull: true,
      },
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        //Minimum eight characters, at least one letter and one number:
        notEmpty: true,
        notNull: true,
      },
      // allowNull defaults to true
    },
    balance: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 5,
      validate: {
        isInt: true,
        min: -50,
        max: 1000,
      },
    },
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "user",
    //   validate: {
    //     isIn: {
    //       args: [["user", "admin","owner"]],
    //       msg: "role must be user or admin or owner",
    //     },
    //   },
    // },
  },
  {
    // Other model options go here
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

User.beforeCreate(async (user, options) => {
  user.password = await user.hashPassword(user.password);
  console.log(user.password);
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password); // true
};

User.prototype.hashPassword = async function (password) {
  const saltRounds = 10;
  return  bcrypt.hashSync(password, saltRounds);
};

User.prototype.getJwtToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
};

// User.prototype.increaseCoin = function () {
//   this.vCoin = this.vCoin + 1;
// };

// User.prototype.decreaseCoin = function () {
//   this.vCoin = this.vCoin - 1;
// };
// `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

module.exports = User;
