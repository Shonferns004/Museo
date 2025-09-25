import express from 'express';
import { adminDelete, adminEmailGet, adminGet, adminUpdate, mainAdmin, mainAdminUpdate } from '../controller/admin.js';

const adminRouter = express.Router();

adminRouter.post('/admin-login', mainAdmin);
adminRouter.get('/list', adminGet);
adminRouter.get('/:email', adminEmailGet);
adminRouter.delete('/:id', adminDelete);
adminRouter.put('/:id', adminUpdate);
adminRouter.put('/update/:id', mainAdminUpdate);

export default adminRouter;
