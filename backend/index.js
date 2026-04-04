import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import noteRouter from './routers/noteRouter.js';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', noteRouter);

app.listen(port, () => {
  console.log(`App listen the port ${port}`);
});
