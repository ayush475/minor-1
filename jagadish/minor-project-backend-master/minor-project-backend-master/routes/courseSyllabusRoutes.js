const express=require('express');
const { getAllCourseSyllabus, createNewCourseSyllabus, getCourseSyllabusDetails, deleteCourseSyllabus } = require('../controller/courseSyllabusController');


const router=express.Router();

router.get('/coursesyllabuses',getAllCourseSyllabus);
router.post('/create/coursesyllabus',createNewCourseSyllabus);
router.get('/coursesyllabus/:courseSyllabusId',getCourseSyllabusDetails);
router.delete('/delete/courseSyllabus/:courseSyllabusId',deleteCourseSyllabus);

module.exports=router;