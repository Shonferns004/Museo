import express from 'express';
import { getUser, getUsername, login, register, userEmailGet } from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:email', userEmailGet);
router.put("/update", getUsername);
router.get("/get/:email", getUser);


export default router;
