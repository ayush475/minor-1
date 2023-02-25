const express=require('express');
const {  registerNewDevice, getAllDevices, getDeviceDetails, deleteDevice, updateDeviceLocation, updateDeviceRoute } = require('../controller/deviceController');
const { requiredToken } = require('../middlewares/authMiddleWare');

const router=express.Router();


router.post('/register/device',registerNewDevice);
router.get('/devices',getAllDevices);
router.get('/device/:deviceId',getDeviceDetails);
router.put('/update/route/device/:deviceId',requiredToken,updateDeviceRoute);
router.delete('/delete/device/:deviceId',deleteDevice);

module.exports=router;