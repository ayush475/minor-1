const sequelize = require("../config/database");
const UserTravel = require("../model/userTravelModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");
const { calculateBusFareRatePerMeter } = require("../utils/gpsUtils");

exports.getAllUserTravel = async (req, res, next) => {
  const filterParams = await filter(req.query);

  UserTravel.findAll(filterParams)
    .then((userTravel) => {
      return res.status(200).json({
        sucess: true,
        userTravel: userTravel,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.createNewUserTravel =async (req, res, next) => {
  const { busTravelId,userId } = req.body;
  const date = new Date();
//   const recentNodes = {
//     locationsWithTimeStamp: [startLocation, date],
//   };

  // const locations=[[location]]
  const result=await sequelize.query(`select recentNodes from busTravels where id=${busTravelId};`,{
    type: sequelize.QueryTypes.SELECT 
  });
  const latestNode=result[0].recentNodes.locationsWithTimeStamp;
  // console.log(latestNode[latestNode.length-1][0]);
  const startLocation=latestNode[latestNode.length-1][0];
  // const startLocation=locationsWithTimeStamp[locationsWithTimeStamp.length-1][0];
  // console.log(startLocation);
  // console.log(nodesOfBusTravel);
  const userTravel = UserTravel.build({
    busTravelId: busTravelId,
    startLocation: startLocation,
    userId: userId,
  });
  return userTravel
    .save()
    .then((userTravel) => {
      console.log(userTravel.toJSON());
      return res.status(200).json({
        sucess: true,
        message: "course userTravel created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err));
    });
};

exports.getUserTravelDetails = (req, res, next) => {
  const { userTravelId } = req.params;
  console.log(userTravelId);
  UserTravel.findByPk(userTravelId)
    .then((userTravel) => {
      if (!userTravel) {
        next(new ErrorHandler(" userTravel doesnot exist", 404));
      }
      console.log(userTravel.toJSON());
      return res.status(200).json({
        sucess: true,
        userTravel: userTravel,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteUserTravel = (req, res, next) => {
  const { userTravelId } = req.params;
  // console.log(token);
  UserTravel.findByPk(userTravelId)
    .then((userTravel) => {
      if (!userTravel) {
        next(new ErrorHandler(" userTravel doesnot exist", 404));
      }
      // console.log(subject.toJSON());
      userTravel.destroy().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `course userTravel deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.updateUserTravel = async (req, res, next) => {
  //  console.log("cuns");
  const filterParams = await filter(req.query);
  const { userTravelId } = req.params;
  const { locations } = req.body;
  console.log(userTravelId, "ddddddddddddddddddddddddddddddddddddddd");
  //   console.log(macAddress);
  // console.log(userTravelId);

  UserTravel.findByPk(userTravelId)
    .then((userTravel) => {
      console.log(userTravel);
      if (!userTravel) {
        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        return next(new ErrorHandler("userTravel doesnot exist",404));
      }
      // userTravel.nodes={locations:locations};
      return userTravel.save().then(() => {
        // console.log(status);
        return res.status(200).json({
          sucess: true,
          message: `UserTravel  updated sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.userTravelCheckOut = async (req, res, next) => {
  //  console.log("cuns");
  // const filterParams = await filter(req.query);

  const { userTravelId } = req.params;
  

  UserTravel.findByPk(userTravelId)
    .then(async(userTravel) => {
      console.log(userTravel);
      if (!userTravel) {
        // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        return next(new ErrorHandler("userTravel doesnot exist",404));
      }
      const result=await sequelize.query(`select recentNodes from busTravels where id=${userTravel.busTravelId};`,{
        type: sequelize.QueryTypes.SELECT 
      });
  const latestNode=result[0].recentNodes.locationsWithTimeStamp;
  const latestDestinationLocation=latestNode[latestNode.length-1][0];
      // console.log(latestNode);
      // console.log(latestDestinationLocation);
      const busPriceRate=calculateBusFareRatePerMeter(userTravel.distanceTravelled);
      // console.log(busPriceRate);
      userTravel.destinationLocation=latestDestinationLocation;
      const totalPrice=userTravel.distanceTravelled*busPriceRate;
      console.log(totalPrice);

  const result1=await sequelize.query(`update Users set balance=balance-${totalPrice} where id=${userTravel.userId};`,{
    type: sequelize.QueryTypes.SELECT 
  });

     
      

      // userTravel.nodes={locations:locations};
      return userTravel.save().then(() => {
        // console.log(status);
        return res.status(200).json({
          sucess: true,
          message: `UserTravel  updated sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};
