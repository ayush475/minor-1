const Route = require("../model/routeModel");
const { filter } = require("../utils/auth");
const ErrorHandler = require("../utils/errorHandler");
// const storage = require('../utils/storage');

exports.getAllRoutes = async (req, res, next) => {
  const filterParams=await filter(req.query);
  Route.findAll(filterParams)
    .then((routes) => {
      return res.status(200).json({
        sucess: true,
        routes: routes,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.registerNewRoute = async (req, res, next) => {
  const { locations } = req.body;
  // storage.storeFile();
console.log(locations);
  const route = await Route.build({
    nodes:{locations:locations}
  });
  return route
    .save()
    .then((route) => {
      console.log(route.toJSON());
      return res.status(200).json({
        sucess: true,
        message: "route created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err));
    });
};

exports.getRouteDetails = (req, res, next) => {
  const { routeId } = req.params;
  // console.log(token);
  Route.findByPk(routeId)
    .then((route) => {
      if (!route) {
        next(new ErrorHandler("Route doesnot exist", 404));
      }
      console.log(route.toJSON());
      return res.status(200).json({
        sucess: true,
        route: route,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.deleteRoute = (req, res, next) => {
  const { routeId } = req.params;
  // console.log(token);
  Route.findByPk(routeId)
    .then((route) => {
      if (!route) {
        next(new ErrorHandler("Route doesnot exist", 404));
      }
      // console.log(subject.toJSON());
      route.destroy().then(() => {
        return res.status(200).json({
          sucess: true,
          message: `Route deleted sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};

exports.updateRoute= (req, res, next) => {
//  console.log("cuns");
const {routeId}=req.params;
  const { locations } = req.body;
  console.log(locations);
//   console.log(macAddress);
  // console.log(routeId);
  

  Route.findByPk(routeId)
    .then((route) => {
      console.log(route);
      if(!route){
        next(new ErrorHandler(404,"route doesnot exist"));
      }
      route.nodes={locations:locations};
      return route.save().then((status) => {
        console.log(status);
        return res.status(200).json({
          sucess: true,
          message: `Route location updates sucessfully`,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(new ErrorHandler(err));
    });
};


// exports.updateRouteRoute = (req, res, next) => {
//   console.log("cuns");
//    const {route,macAddress } = req.body;
//   //  console.log(location);
//    console.log(macAddress);
//    // console.log(routeId);
   
 
//    Route.findOne({macAddress:macAddress})
//      .then((route) => {
//       if(!route){
//         next(new ErrorHandler(404,"route not found"));
//       }
//        console.log(route);
//        route.route = route;
//        return route.save().then(() => {
//          return res.status(200).json({
//            sucess: true,
//            message: `Route route  updated sucessfully`,
//          });
//        });
//      })
//      .catch((err) => {
//        console.log(err);
//        next(new ErrorHandler(err));
//      });
//  };