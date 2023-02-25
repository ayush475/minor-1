const Device = require("../model/deviceModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");
// const storage = require('../utils/storage');

exports.getAllDevices = async (req, res, next) => {
  const filterParams = await filter(req.query);
  Device.findAll(filterParams)
    .then((devices) => {
      return res.status(200).json({
        sucess: true,
        devices: devices,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.registerNewDevice = async (req, res, next) => {
  const { macAddress, ownerId } = req.body;
  // storage.storeFile();

  const device = await Device.build({
    macAddress: macAddress,
    ownerId: ownerId,
  });
  return device
    .save()
    .then((device) => {
      console.log(device.toJSON());
      return res.status(200).json({
        sucess: true,
        message: "device created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err));
    });
};

exports.getDeviceDetails = (req, res, next) => {
  const { deviceId } = req.params;
  // console.log(token);
  Device.findByPk(deviceId)
    .then((device) => {
      if (!device) {
        next(new ErrorHandler("Device doesnot exist", 404));
      }
      console.log(device.toJSON());
      return res.status(200).json({
        sucess: true,
        device: device,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteDevice = (req, res, next) => {
  const { deviceId } = req.params;
  // console.log(token);
  Device.findByPk(deviceId)
    .then((device) => {
      if (!device) {
        next(new ErrorHandler("Device doesnot exist", 404));
      }
      // console.log(subject.toJSON());
      device.destroy().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `Device deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

// exports.updateDeviceLocation = (req, res, next) => {
//  console.log("cuns");
//   const { location,macAddress } = req.body;
//   console.log(location);
//   console.log(macAddress);
//   // console.log(deviceId);
  

//   Device.findOne({macAddress:macAddress})
//     .then((device) => {
//       console.log(device);
//       device.location = location;
//       return device.save().then(() => {
//         return res.status(200).json({
//           sucess: true,
//           message: `Device location updated to ${location}`,
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new ErrorHandler(err));
//     });
// };


exports.updateDeviceRoute = (req, res, next) => {
  // console.log("cuns");
   const {deviceId}=req.params;
   const {routeId}=req.body;
  //  console.log(location);
  //  console.log(macAddress);
   // console.log(deviceId);
   
 
   Device.findByPk(deviceId)
     .then((device) => {
      if(!device){
        next(new ErrorHandler("device not found",404));
      }
      //  console.log(device);
       device.routeId = routeId;
       return device.save().then(() => {
         return res.status(200).json({
           sucess: true,
           message: `Device route  updated to ${routeId} sucessfully`,
         });
       });
     })
     .catch((err) => {
       console.log(err);
       next(new ErrorHandler(err));
     });
 };