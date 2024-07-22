
const express = require("express");
const router = express.Router();
const authenticateUser=require('../middlewares/authUser')

const {allNotes,noteById,createNote,updateNote,archiveNote,trashNote,restoreNote,deleteNote,getArchivedNotes,getTrashedNotes}=require('../controllers/noteController')

router.get('/', authenticateUser, allNotes)
router.get('/archived',authenticateUser,getArchivedNotes)
router.get('/trashed',authenticateUser,getTrashedNotes)
router.get('/:id',authenticateUser,noteById)
router.post('/',authenticateUser,createNote)
router.put('/:id',authenticateUser,updateNote)
router.put('/:id/archive',authenticateUser,archiveNote)
router.put('/:id/trash',authenticateUser,trashNote)
router.put('/:id/trashed/restore',authenticateUser,restoreNote)
router.delete('/:id',authenticateUser,deleteNote)

module.exports = router;