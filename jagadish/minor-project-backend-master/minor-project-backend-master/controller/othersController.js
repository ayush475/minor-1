const sequelize = require("../config/database");
const ErrorHandler = require("../utils/errorHandler");

exports.getBusTravelInfoByDeviceId = async (req, res, next) => {
  const { deviceId } = req.params;

  try {
    const result = await sequelize.query(
      `select devices.id as deviceId,macAddress,devices.routeId as routeId,ownerId,routes.nodes as routeNodes,bustravels.id as bustravelId,velocity,bustravels.startLocation as busTravelStartLocation,bustravels.stopLocation as busTravelStopLocation,bustravels.recentNodes as busTravelRecentNodes from devices inner join routes  on devices.routeId=routes.id inner join bustravels on bustravels.deviceId=devices.id where bustravels.stopLocation is null and devices.id=${deviceId};`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      sucess: true,
      busInfo: result,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err));
  }
};


exports.getAllTravellingBusDevicesInfo = async (req, res, next) => {

  try {
    const result = await sequelize.query(
      `select devices.id as deviceId,macAddress,devices.routeId as routeId,ownerId,routes.nodes as routeNodes,bustravels.id as bustravelId,velocity,bustravels.startLocation as busTravelStartLocation,bustravels.stopLocation as busTravelStopLocation,bustravels.recentNodes as busTravelRecentNodes from devices inner join routes  on devices.routeId=routes.id inner join bustravels on bustravels.deviceId=devices.id where bustravels.stopLocation is null;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      sucess: true,
      busInfo: result,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err));
  }
};
