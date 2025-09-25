import express from 'express';
import { editSchedule, planTour, recommend, visualizeTour } from '../controller/flask.js';

const flaskRouter = express.Router(); 

flaskRouter.get('/recommend', recommend);
flaskRouter.get('/plan', planTour);
flaskRouter.post('/edit', editSchedule);
flaskRouter.get('/visualize', visualizeTour);


export default flaskRouter;
