const express=require('express');
const {  getAllBusTravel, getBusTravelDetails, deleteBusTravel, createNewBusTravel, updateBusTravel, getAllUserTravel, createNewUserTravel, getUserTravelDetails, updateUserTravel, deleteUserTravel, userTravelCheckOut } = require('../controller/userTravelController');

const router=express.Router();

router.get('/userTravels',getAllUserTravel);
router.post('/create/userTravel',createNewUserTravel);
router.get('/userTravel/:userTravelId',getUserTravelDetails);
router.put('/update/userTravel/:userTravelId',updateUserTravel);
router.put('/userTravel/checkout/:userTravelId',userTravelCheckOut);
router.delete('/delete/userTravel/:userTravelId',deleteUserTravel);

module.exports=router;