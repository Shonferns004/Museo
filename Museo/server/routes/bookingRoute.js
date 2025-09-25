import express from 'express';
import { bookTicket, getTicket } from '../controller/booking.js';

const bookingRouter = express.Router(); 

bookingRouter.post('/book', bookTicket);
bookingRouter.get('/get', getTicket);


export default bookingRouter;
