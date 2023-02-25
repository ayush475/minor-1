const express=require('express');
const { login, logOut, increaseVirtualCoin, changePassword } = require('../controller/authController');
const { authenticateUser } = require('../middlewares/authMiddleWare');



const router=express.Router();
/// auth
router.post('/login',login);
router.post('/logout',logOut);
router.put('/changepassword',authenticateUser,changePassword);

router.put('/update/coin/:id',increaseVirtualCoin);

module.exports=router;