import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
    heading: {
      require: true,
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
