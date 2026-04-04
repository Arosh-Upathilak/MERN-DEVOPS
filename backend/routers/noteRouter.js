import express from 'express';
import {
  createNote,
  updateNote,
  removeNote,
  getNote,
  getAllNote,
} from '../controllers/noteController.js';

const noteRouter = express.Router();

noteRouter.post('/create', createNote);
noteRouter.put('/update/:id', updateNote);
noteRouter.delete('/remove/:id', removeNote);
noteRouter.get('/getNote/:id', getNote);
noteRouter.get('/getNotes', getAllNote);

export default noteRouter;
