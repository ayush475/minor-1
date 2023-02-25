const express=require('express');

const { createNewNote, getAllNotes, getNoteDetails, deleteNote } = require('../controller/notesController');

const router=express.Router();


router.post('/create/note',createNewNote);
router.get('/notes',getAllNotes);
router.get('/note/:noteId',getNoteDetails);
router.delete('/delete/note/:noteId',deleteNote);

module.exports=router;