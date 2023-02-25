const express=require('express');
const { getAllRoutes, registerNewRoute, getRouteDetails, deleteRoute, updateRoute} = require('../controller/routeController');

const router=express.Router();

router.get('/routes',getAllRoutes);
router.post('/create/route',registerNewRoute);
router.get('/route/:routeId',getRouteDetails);
router.put('/update/route/:routeId',updateRoute);
router.delete('/delete/route/:routeId',deleteRoute);

module.exports=router;