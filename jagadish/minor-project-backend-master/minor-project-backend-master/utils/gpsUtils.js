const { where } = require("sequelize");
const sequelize = require("../config/database");
const { increaseVirtualCoin } = require("../controller/authController");
const UserTravel = require("../model/userTravelModel");

const radians = Math.PI / 180;

const calculateGpsCoordinatesDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters

  const φ1 = lat1 * radians;
  const φ2 = lat2 * radians;
  const Δφ = (lat2 - lat1) * radians;
  const Δλ = (lon2 - lon1) * radians;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
};

const parseLatAndLong = (str) => {
  let data = str.split(",");
  // console.log(data);
  return {
    lat: data[0],
    lng: data[1],
  };
};

// parseLatAndLong("22,23");

const calculateAverageVelocity=(nodes)=> {
  let totalVelocity = 0;
  // let nodes = [
  //   ["24,26", "2023-02-09T07:13:58.850Z"],
  //   ["23,26", "2023-02-09T07:13:59.839Z"],
  //   ["23,26", "2023-02-09T07:15:59.839Z"],
  //   ["23,26", "2023-02-09T07:14:59.839Z"],
  //   // ["23,26", "2023-02-09T07:14:01.092Z"],
  // ];

  for (let i = 0; i < nodes.length - 1; i++) {
    // console.log(i);
    const firstCoordinate = parseLatAndLong(nodes[i][0]);
    const secondsCoordinates = parseLatAndLong(nodes[i + 1][0]);
    // console.log(firstCoordinate);
    // console.log(secondsCoordinates);
    const distanceTravelled = calculateGpsCoordinatesDistance(
      firstCoordinate.lat,
      firstCoordinate.lng,
      secondsCoordinates.lat,
      secondsCoordinates.lng
    );
    const timeElapsed = Math.abs(
      (Date.parse(nodes[i + 1][1]) - Date.parse(nodes[i][1])) / 1000
    );
    // console.log(timeElapsed);
    // console.log(distanceTravelled);
    totalVelocity += distanceTravelled / timeElapsed;
    // console.log(totalVelocity, "m/s");
  }
  let avgVelocity=totalVelocity/(nodes.length-1);
  console.log("avgvelocity",avgVelocity,"m/s");
  return avgVelocity;
}

// let avgVelocity = calculateAverageVelocity();
// console.log(avgVelocity);

// // Example usage:
// const lat1 = 51.5074;
// const lon1 = 0.1278;
// const lat2 = 40.7128;
// const lon2 = 74.0060;

// const distance = distanceBetweenPoints(lat1, lon1, lat2, lon2);
// console.log(distance + " meters");

// let date=new Date();
// let stringDate= "2023-02-08T07:31:03.297Z";
// let data=Date.parse(stringDate);

// let arr = [2, 3];
// arr.shift();
// // arr.unshift();
// console.log(arr);
// async function updateDistanceTravelled(){
//   const result=await sequelize.query('select id from userTravels where busTravelId=1 and destinationLocation is null;',{
//     type: sequelize.QueryTypes.SELECT 
//   });
//   // console.log(result);
//   result.forEach(async(data,index)=>{
//     // console.log(res.id);
//     await UserTravel.update({
//       distanceTravelled:20
//     },{
//       where: {id:data.id}
//     })
//   })
//   console.log("coocococo");
// }


// updateDistanceTravelled();

const calculateBusFareRatePerMeter=(distanceTravelled)=>{
if(distanceTravelled<20){
  return 20;
}else{

  // some price mapping functions here
 return 200;
}
  
}


module.exports={calculateGpsCoordinatesDistance,parseLatAndLong,calculateAverageVelocity,calculateBusFareRatePerMeter};