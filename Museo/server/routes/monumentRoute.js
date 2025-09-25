import express from 'express';
import { upload } from '../config/multer.js';
import { addMonument, deleteMonument, getMonument, getPopularAndRecentMonument } from '../controller/monument.js';

const monumentRouter = express.Router();

monumentRouter.post('/add', upload.single('image'),addMonument );


monumentRouter.get('/get-filter', getPopularAndRecentMonument);
monumentRouter.get('/get', getMonument);
monumentRouter.delete('/:id', deleteMonument);

export default monumentRouter;
