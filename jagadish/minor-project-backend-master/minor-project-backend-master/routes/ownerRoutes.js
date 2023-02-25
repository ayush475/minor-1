const express=require('express');
const { login, logOut } = require('../controller/authController');
const { getAllOwners, createNewOwner, getMyProfile } = require('../controller/ownerController');
const { authenticateOwner, requiredToken } = require('../middlewares/authMiddleWare');

const router=express.Router();

router.get('/owners',requiredToken,getAllOwners);

router.post('/create/owner',createNewOwner);
// router.get('/myprofile',authenticateOwner,getMyProfile);






module.exports=router;