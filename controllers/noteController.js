const Note = require('../models/noteModel');

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
    const archivedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { isArchived: true, updatedAt: Date.now() },
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

// Delete a note
 const deleteNote= async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {allNotes,noteById,createNote,updateNote,archiveNote,trashNote,deleteNote};
