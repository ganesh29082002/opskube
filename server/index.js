import express from 'express'; 
import {connect} from './db/db';
import cors from 'cors'
import eventRouter from './routes/EventManagmentRoute';
import authRouter from './routes/AuthRoutes';

const app = express()

connect()
app.use(cors())
// middleware
app.use(express.json())
app.use(cors())
app.use("/api/v1" , authRouter)
app.use("/api/v1" , eventRouter )



module.exports =   app 