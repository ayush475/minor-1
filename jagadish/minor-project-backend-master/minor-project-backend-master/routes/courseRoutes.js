const express=require('express');
const {  getAllCourses, createNewCourse, getCourseDetails, deleteCourse } = require('../controller/courseController');

const router=express.Router();

router.get('/courses',getAllCourses);
router.post('/create/course',createNewCourse);
router.get('/course/:courseId',getCourseDetails);
router.delete('/delete/course/:courseId',deleteCourse);

module.exports=router;