const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

exports.sendToken = (user, res, statusCode) => {
  const token = user.getJwtToken();
  // console.log(new Date(
  //   Date.now() + 24 * 60 * 60 * 1000
  // ))

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options);
};

exports.decodeToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

exports.filter = (data) => {
  // console.log(data);
  let params = {};
  for (const prop in data) {
    if (data[prop]) {
      params[prop] = data[prop];
    }
  }

  if (Object.keys(params).length === 0) {
    return;
  }
  return {
    where: params,
  };
};

exports.jointParamFilter = (data) => {
  console.log("run");
  let params = {};
  let str = "where ";
  for (const prop in data) {
    if (data[prop]) {
      params[prop] = data[prop];
      // str+=`"${prop}"=${data[prop]}`
      // console.log(Object.keys(data).pop().toString());
      // console.log(prop);
      // if(Object.keys(data).pop().toString()==prop){
      //   str+=" and ";
      // }
    }
  }
  for (let prop in params) {
    str += `"${prop}"=${params[prop]}`;
    if (Object.keys(params).pop().toString() !== prop) {
      str += " and ";
    }
  }

  console.log(str);
  if (Object.keys(params).length === 0) {
    return "";
  }
  console.log(str);
  return str;
};
