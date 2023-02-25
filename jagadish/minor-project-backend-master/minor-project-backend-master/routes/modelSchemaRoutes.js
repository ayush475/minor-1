const express=require('express');
const { updateAllModelSchema } = require('../controller/modelSchemaController');

const router=express.Router();

router.get('/update/model/schemas',updateAllModelSchema);

module.exports=router;