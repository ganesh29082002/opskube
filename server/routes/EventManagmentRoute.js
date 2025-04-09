import express from 'express';
import { createEvent, getEvents, getAllEventsOfUser, updateEvent, deleteEvent  , deleteSelectedEvents , rsvpToEvent , getRSVPsForEvent , getRSVPsForUser} from '../controllers/EventManagmentController.js';
import {verifyToken} from '../middelwares/AuthMiddleware.js';

const eventRouter = express.Router();

eventRouter.post('/event', verifyToken, createEvent);
eventRouter.get('/events', verifyToken, getEvents);
eventRouter.get('/all-events', verifyToken, getAllEventsOfUser);
eventRouter.put('/event/:id', verifyToken, updateEvent);
eventRouter.delete('/event/:id', verifyToken, deleteEvent);
eventRouter.delete('/event', verifyToken, deleteSelectedEvents);
eventRouter.post('/rsvp/:eventId', verifyToken, rsvpToEvent);
eventRouter.get('/rsvp/:eventId', verifyToken, getRSVPsForEvent);
eventRouter.get('/user/rsvp', verifyToken, getRSVPsForUser);





// eventRouter.get('/task/statistics', verifyToken, getStatistics);


export default eventRouter;
