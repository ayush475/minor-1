const express=require('express');
const { login, logOut } = require('../controller/authController');
const { getAllUsers, createNewUser, getMyProfile, updateUserDetails, deleteUser } = require('../controller/userController');
const { authenticateUser, requiredToken } = require('../middlewares/authMiddleWare');

const router=express.Router();

router.get('/users',requiredToken,getAllUsers);

router.post('/create/user',createNewUser);
router.put('/update/user/:userId',updateUserDetails);
router.delete('/delete/user/:userId',deleteUser);
// router.get('/myprofile',authenticateUser,getMyProfile);






module.exports=router;