const express=require('express');
const {  getAllBusTravel, getBusTravelDetails, deleteBusTravel, createNewBusTravel, updateBusTravel, endBusTravel } = require('../controller/bustravelController');

const router=express.Router();

router.get('/bustravels',getAllBusTravel);
router.post('/create/bustravel',createNewBusTravel);
router.get('/bustravel/:busTravelId',getBusTravelDetails);
router.put('/update/bustravel/:busTravelId',updateBusTravel);
router.put('/end/bustravel/:busTravelId',endBusTravel);
router.delete('/delete/bustravel/:busTravelId',deleteBusTravel);

module.exports=router;