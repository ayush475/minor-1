const express=require('express');
const {  getJointTableDetails } = require('../controller/jointController');

const router=express.Router();


router.get('/join',getJointTableDetails);


module.exports=router;