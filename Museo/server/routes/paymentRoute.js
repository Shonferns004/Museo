import express from 'express';
import { createPaymentIntent, updatePayment } from '../controller/payment.js';

const paymentRouter = express.Router();

paymentRouter.post('/check-out', createPaymentIntent);
paymentRouter.get('/success', updatePayment);



export default paymentRouter;
