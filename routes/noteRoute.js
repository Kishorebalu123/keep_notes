
const express = require("express");
const router = express.Router();
const authenticateUser=require('../middlewares/authUser')

const {allNotes,noteById,createNote,updateNote,archiveNote,trashNote,deleteNote}=require('../controllers/noteController')

router.get('/', authenticateUser, allNotes)
router.get('/:id',noteById)
router.post('/',createNote)
router.put('/:id',updateNote)
router.put('/:id/archive',archiveNote)
router.put('/:id/trash',trashNote)
router.delete('/:id',deleteNote)

module.exports = router;