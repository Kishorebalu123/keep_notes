const mongoose = require('mongoose');


const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  labels: [String],
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  backgroundColor: { type: String, default: '#FFFFFF' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Note = mongoose.model('Note', NoteSchema);
module.exports=Note
