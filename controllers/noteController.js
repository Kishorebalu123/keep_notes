const Note = require('../models/noteModel');
const { findByIdAndDelete } = require('../models/userModel');

// Get all notes
const allNotes= async (req, res) => {
  try {
    const notes = await Note.find({ isTrashed: false ,isArchived:false});
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single note
 const noteById= async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new note
 const createNote= async (req, res) => {
  const { title, content, labels, backgroundColor } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      labels,
      backgroundColor,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a note
 const updateNote= async (req, res) => {
  const { title, content, labels, isArchived, isTrashed, backgroundColor } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, labels, isArchived, isTrashed, backgroundColor, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Archive a note
 const archiveNote= async (req, res) => {
  try {
    const archiveStatus=await Note.findById(req.params.id)
    const archivedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { isArchived: !archiveStatus.isArchived, updatedAt: Date.now() },
      
      { new: true }
    );
    res.json(archivedNote);
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Trash a note
 const  trashNote= async (req, res) => {
  try {
    const trashedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { isTrashed: true, updatedAt: Date.now() },
      { new: true }
    );
    res.json(trashedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restore or permanently delete a trashed note
const restoreNote = async (req, res) => {
try {
    const note = await Note.findById(req.params.id);
     note.isTrashed = false;
      await note.save();
      return res.status(200).json({ message: 'Note restored', note });
    
  } catch (error) {
    res.status(500).json({ error:  err.message });
  }
};

// Delete a note
 const deleteNote= async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getArchivedNoes
const getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isArchived: true });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// getTrashNotes
const getTrashedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isTrashed: true });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


module.exports = {allNotes,noteById,createNote,updateNote,archiveNote,trashNote,restoreNote,deleteNote,getArchivedNotes,getTrashedNotes};
