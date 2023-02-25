const express=require('express');
const { createNewSubject, getAllSubjects, getSubjectDetails, deleteSubject } = require('../controller/subjectController');

const router=express.Router();


router.post('/create/subject',createNewSubject);
router.get('/subjects',getAllSubjects);
router.get('/subject/:subjectId',getSubjectDetails);
router.delete('/delete/subject/:subjectId',deleteSubject);

module.exports=router;