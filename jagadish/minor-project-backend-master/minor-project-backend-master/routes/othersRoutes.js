const express=require('express');
const { getBusTravelInfoByDeviceId, getAllTravellingBusDevicesInfo } = require('../controller/othersController');


const router=express.Router();


router.get('/user/businfo/device/:deviceId',getBusTravelInfoByDeviceId);
router.get('/user/travelling/busdevices',getAllTravellingBusDevicesInfo);

module.exports=router;