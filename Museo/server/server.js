import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import configureCloudinary from './config/cloudinary.js';
import connectDB from './config/mongoDb.js';
import dotenv from "dotenv";
import adminRouter from './routes/adminRoute.js';
import monumentRouter from './routes/monumentRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import flaskRouter from './routes/flaskRoute.js';
dotenv.config();



const app = express();
app.use(cors());
app.use(bodyParser.json());



connectDB();
configureCloudinary();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/monument', monumentRouter);
app.use('/api/payment', paymentRouter);
app.use('/api', bookingRouter);
app.use('/api/flask', flaskRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
