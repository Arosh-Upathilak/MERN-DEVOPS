import Note from '../models/noteModel.js';

const createNote = async (req, res) => {
  const { name, heading, description } = req.body;
  try {
    if (!name || !heading) {
      return res.status(400).json({ success: false, message: 'Name and heading are required' });
    }
    const newNote = new Note({
      name,
      heading,
      description,
    });

    await newNote.save();
    return res
      .status(201)
      .json({ success: true, message: 'Note created successfully', data: newNote });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { name, heading, description } = req.body;

    const updateNote = await Note.findByIdAndUpdate(noteId, { name, heading, description });

    if (!updateNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Note update succesfull', data: updateNote });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
};

const removeNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const existingNote = await Note.findByIdAndDelete(noteId);
    if (!existingNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.status(202).json({ success: true, message: 'Note delete succesfull' });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
};

const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res.status(404).json({ success: false, message: 'Not found the note' });
    }
    return res.status(200).json({ success: true, message: '', data: existingNote });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
};

const getAllNote = async (req, res) => {
  try {
    const allNotes = await Note.find();
    return res.status(200).json({ success: true, message: '', allNotes });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
};

export { createNote, updateNote, removeNote, getNote, getAllNote };
