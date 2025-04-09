
import express from 'express';
import {  register , logIn  } from '../controllers/AuthController.js'; 
const authRouter = express.Router();

//public routes 
authRouter.post('/register', register)
authRouter.post('/login', logIn)


export default authRouter;




























// userRouter.post("/upload", fileupload.single('image'), uploadImage);
// userRouter.post("/images", fileupload.array('images', 5), uploadImages);