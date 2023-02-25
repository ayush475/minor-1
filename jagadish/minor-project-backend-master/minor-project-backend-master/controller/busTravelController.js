const sequelize = require("../config/database");
const BusTravel = require("../model/busTravelModel");
const UserTravel = require("../model/userTravelModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");
const { calculateAverageVelocity, calculateGpsCoordinatesDistance, parseLatAndLong } = require("../utils/gpsUtils");

exports.getAllBusTravel = async (req, res, next) => {
  const filterParams = await filter(req.query);

  BusTravel.findAll(filterParams)
    .then((busTravel) => {
      return res.status(200).json({
        sucess: true,
        busTravel: busTravel,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.createNewBusTravel =async(req, res, next) => {
  const { startLocation, deviceId } = req.body;
  const date = new Date();
  const recentNodes = {
    locationsWithTimeStamp: [
      [startLocation, date],
      [startLocation, date],
    ],
  };
  // check if device id has route definded
  const deviceResult=await sequelize.query(`select * from devices where devices.id =${deviceId}`,{
    type: sequelize.QueryTypes.SELECT 
  });

 console.log(deviceResult,"ddddddddddddddd");
 if(deviceResult && deviceResult[0].routeId==null){
  return res.status(400).json({
    sucess:false,
    error:"your device doesnot have a defined route"
  })
 }

// check for double if only one instace of bustravel is created by a single device
  const result=await sequelize.query(`select id from busTravels where deviceId=${deviceId} and stopLocation is null;`,{
    type: sequelize.QueryTypes.SELECT 
  });

 console.log(result,"ddddddddddddddd");
 if(result.length>0){
  return res.status(400).json({
    sucess:false,
    error:"you have previous bus trave ongoing please close that first"
  })
 }

  // const locations=[[location]]
  const busTravel = BusTravel.build({
    deviceId: deviceId,
    startLocation: startLocation,
    recentNodes: recentNodes,
  });
  return busTravel
    .save()
    .then((busTravel) => {
      console.log(busTravel.toJSON());
      return res.status(200).json({
        sucess: true,
        message: "course busTravel created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err));
    });
};

exports.getBusTravelDetails = (req, res, next) => {
  const { busTravelId } = req.params;
  console.log(busTravelId);
  BusTravel.findByPk(busTravelId)
    .then((busTravel) => {
      if (!busTravel) {
        next(new ErrorHandler(" busTravel doesnot exist", 404));
      }
      console.log(busTravel.toJSON());
      return res.status(200).json({
        sucess: true,
        busTravel: busTravel,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteBusTravel = (req, res, next) => {
  const { busTravelId } = req.params;
  // console.log(token);
  BusTravel.findByPk(busTravelId)
    .then((busTravel) => {
      if (!busTravel) {
        next(new ErrorHandler(" busTravel doesnot exist", 404));
      }
      // console.log(subject.toJSON());
      busTravel.destroy().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `course busTravel deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.updateBusTravel = async (req, res, next) => {
  const { busTravelId } = req.params;
  const { location } = req.query;
  const date = new Date();
  const currentLocationWithTimeStamp = [location, date.toISOString()];
  console.log(currentLocationWithTimeStamp);
  BusTravel.findByPk(busTravelId)
    .then(async (busTravel) => {
      if (!busTravel) {
        return next(new ErrorHandler("busTravel doesnot exist", 404));
      }  
      if(busTravel.stopLocation){
        return next(new ErrorHandler("cannot update bus travel which has ended", 400));
      }  
      let newLocationTimeStamps = [
        ...busTravel.recentNodes.locationsWithTimeStamp,
      ];
      // IF VELOCITY CALCULATION TIME HAS ELAPSED in seconds
      console.log((date.getTime()-Date.parse(newLocationTimeStamps[newLocationTimeStamps.length-1][1]))/1000);
      console.log(process.env.GPSVELOCITYCALCULATIONTIME);
      if(((date.getTime()-Date.parse(newLocationTimeStamps[0][1]))/1000)>process.env.GPSVELOCITYCALCULATIONTIME){
         console.log("DONE");
         newLocationTimeStamps.shift(); // removing first element of arra
         newLocationTimeStamps.push(currentLocationWithTimeStamp);
      }else{ // console.log(newLocationTimeStamps,"kkkkkk");
        newLocationTimeStamps.push(currentLocationWithTimeStamp);
      }
      const velocity=await calculateAverageVelocity(newLocationTimeStamps);
      console.log(velocity,"dd");
      // user distance is calculated form latest node and new node
      const coordinateSecondLast=parseLatAndLong(newLocationTimeStamps[newLocationTimeStamps.length-2][0]);
      const coordinateLast=parseLatAndLong(newLocationTimeStamps[newLocationTimeStamps.length-1][0]);
// console.log("dddddddddddddddddddddddddddddddddddd");
// console.log(coordinateSecondLast,coordinateLast);
    const userDistanceTravelled=calculateGpsCoordinatesDistance(coordinateSecondLast.lat,coordinateSecondLast.lng,coordinateLast.lat,coordinateLast.lng);
    console.log(userDistanceTravelled);
// getting the users travelling in that bus
if(userDistanceTravelled>0){
  const result=await sequelize.query(`select id,distanceTravelled from userTravels where busTravelId=${busTravelId} and destinationLocation is null;`,{
    type: sequelize.QueryTypes.SELECT 
  });
  console.log(" distance is added to all users");
  result.forEach(async(data,index)=>{
    // console.log(res.id);
    const updatedDistanceTravelled=data.distanceTravelled+userDistanceTravelled;
    await UserTravel.update({
      distanceTravelled:updatedDistanceTravelled
    },{
      where: {id:data.id}
    })
  })
}



      busTravel.velocity=velocity;
      busTravel.recentNodes = { locationsWithTimeStamp: newLocationTimeStamps};

      return busTravel.save().then(() => {
        return res.status(200).json({
          sucess: true,
          message: "Bus travel and corresponding data updated sucessfully",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};



exports.endBusTravel = async (req, res, next) => {
  const { busTravelId } = req.params;
  // const { location } = req.query;
  // const date = new Date();
  // const currentLocationWithTimeStamp = [location, date.toISOString()];
  // console.log(currentLocationWithTimeStamp);
  BusTravel.findByPk(busTravelId)
    .then(async (busTravel) => {
      if (!busTravel) {
        return next(new ErrorHandler("busTravel doesnot exist", 404));
      } 
      if(busTravel.stopLocation){
        return next(new ErrorHandler("cannot update bus travel which has ended", 400));
      }  
         
     const currentDate=new Date();
     
     busTravel.stopLocation=currentDate.toISOString();

      return busTravel.save().then(() => {
        return res.status(200).json({
          sucess: true,
          message: "Bus travel ended  sucessfully",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};
