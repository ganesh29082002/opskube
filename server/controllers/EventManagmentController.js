import { message } from '../config/message';
import { paginate } from '../helper/paginate';
import response from '../helper/response';
import Event from '../models/Event';
import mongoose from 'mongoose';
import RSVP from '../models/RSVP';
// Create a new Event
export const createEvent = async (req, res) => {
  try {
    console.log(req.user , "user")
    const { title, description, date, location , status =null} = req.body;

   
    if (!title || !description || !date || !location) {
      return response.badRequest(res, 400, message.USER_EMPTY_BODY);
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return response.badRequest(res, 400, message.INVALID_DATE);
    }

    const newEvent = new Event({
      title,
      description,
      date: eventDate,
      location,
      createdBy: req.user.userId,
      status : status || "pending"
    });

    await newEvent.save();

    return response.successResponse(res, 201, newEvent, message.EVENT_CREATION_SUCCESS);

  } catch (error) {
    console.error("Event creation failed:", error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};

// Get all events of user 
export const getEvents = async (req, res) => {
  try {
    const { date, title, sortBy, order = 'asc', page = 1, limit = 10, dataLimit = '' } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const sortOrder = order === 'desc' ? -1 : 1;

    
    const matchStage = { createdBy: new mongoose.Types.ObjectId(req.user.userId), isDeleted: false };

    if (title) {
      matchStage.title = { $regex: title, $options: 'i' };
    }

    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        const start = new Date(parsedDate.setHours(0, 0, 0, 0));
        const end = new Date(parsedDate.setHours(23, 59, 59, 999));
        matchStage.date = { $gte: start, $lte: end };
      }
    }

    const pipeline = [{ $match: matchStage }, { $sort: { [sortBy || 'date']: sortOrder } }];

    const result = await paginate(Event, pageNumber, limitNumber, pipeline, dataLimit, { [sortBy || 'date']: sortOrder });

    return response.successResponse(res, 200, result, message.EVENT_FETCH_SUCCESS);

  } catch (error) {
    console.error("Error fetching events:", error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};

// get all events except login user
export const getAllEventsOfUser = async (req, res) => {
  try {
    console.log(req.user , "req.user")
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const { page = 1, limit = 10, sortBy } = req.query;

    
    const pipeline = [
      {
        $match: {
          createdBy: { $ne: userId },
          isDeleted: false
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy"
        }
      },
      {
        $unwind: "$createdBy"
      },
      {
        $sort: sortBy ? sortBy : { date: 1 }
      }
    ];

    const result = await paginate(Event, Number(page), Number(limit), pipeline, null, sortBy);

    return response.successResponse(
      res,
      200,
      result,
      message.EVENT_FETCH_SUCCESS || "Events fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching other events with pagination:", error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};

// Get a single Event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.badRequest(res, 400, message.INVALID_EVENT_ID);
    }

    const event = await Event.findOne({ _id: id, createdBy: req.user.userId });

    if (!event) {
      return response.badRequest(res, 404, message.EVENT_NOT_FOUND);
    }

    return response.successResponse(res, 200, event, message.EVENT_FETCH_SUCCESS);

  } catch (error) {
    console.error('Error fetching event:', error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};

// Update a Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.badRequest(res, 400, message.INVALID_EVENT_ID);
    }

    const event = await Event.findOne({ _id: id, createdBy: req.user.userId });

    if (!event) {
      return response.badRequest(res, 404, message.EVENT_NOT_FOUND);
    }

    
    if (updates.date && isNaN(new Date(updates.date).getTime())) {
      return response.badRequest(res, 400, message.INVALID_DATE);
    }

    Object.assign(event, updates);
    await event.save();

    return response.successResponse(res, 200, event, message.EVENT_UPDATE_SUCCESS);

  } catch (error) {
    console.error('Error updating event:', error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};

//RSVP 
export const rsvpToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userResponse} = req.body;
    const userId = req.user.userId;

    if (!['yes', 'no', 'maybe'].includes(userResponse)) {
      return response.badRequest(res, 400, 'Invalid RSVP response');
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return response.errorMessageResponse(res, 404, 'Event not found');
    }

  
    let rsvp = await RSVP.findOne({ event: eventId, user: userId });

    if (rsvp) {
      rsvp.response = userResponse;
      await rsvp.save();
    return response.successResponse(res, 200, rsvp, 'RSVP is already submitted');

    } else {
      rsvp = await RSVP.create({ event: eventId, user: userId, response : userResponse });
    }

    
    if (response === 'yes' && !event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    } else if (response !== 'yes') {
      event.attendees = event.attendees.filter(
        (attendee) => attendee.toString() !== userId.toString()
      );
      await event.save();
    }

    return response.successResponse(res, 200, rsvp, 'RSVP submitted');

  } catch (error) {
    console.error('RSVP error:', error);
    return response.somethingErrorMsgResponse(res, 500, 'RSVP failed', error.message);
  }
};

// get all rsvp for event 
export const getRSVPsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId || eventId.length !== 24) {
      return response.error(res, 400, "Invalid event ID");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return response.errorMessageResponse(res, 404, message.EVENT_NOT_FOUND || "Event not found");
    }

    const rsvps = await RSVP.find({ event: eventId })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return response.success(
      res,
      200,
      message.RSVP_FETCH_SUCCESS || "RSVP responses fetched successfully",
      rsvps
    );
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return response.error(res, 500, "Internal Server Error", error.message);
  }
};

// get all rsvp for user 
export const getRSVPsForUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, sortBy = { "event.date": 1 } } = req.query;  

    const pipeline = [
      
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },

      {
        $lookup: {
          from: "events",  
          localField: "event", 
          foreignField: "_id",  
          as: "event",
        },
      },

      {
        $unwind: "$event",
      },
  
      {
        $match: { "event.isDeleted": false },
      },

    ];

  
    const result = await paginate(RSVP, Number(page), Number(limit), pipeline);

    if (result.items.length === 0) {
      return response.successResponse(
        res,
        200,
        [],
        "No RSVPs found for this user."
      );
    }

    return response.successResponse(
      res,
      200,
      result,
      "RSVPs found for this user."
    );
  } catch (error) {
    console.error("Error fetching RSVPs:", error.message);
    return response.somethingErrorMsgResponse(
      res,
      500,
      "Internal Server Error",
      error.message
    );
  }
};


// Delete a Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.badRequest(res, 400, message.INVALID_EVENT_ID);
    }

    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: req.user.userId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!event) {
      return response.badRequest(res, 404, message.EVENT_NOT_FOUND_OR_DELETED);
    }

    return response.successResponse(res, 200, event, message.EVENT_DELETE_SUCCESS);

  } catch (error) {
    console.error('Error deleting event:', error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};


export const deleteSelectedEvents = async (req, res) => {
  console.log("deleteSelectedEvents")
  try {
    const { eventIds } = req.body;

    if (!Array.isArray(eventIds) || eventIds.length === 0) {
      return response.badRequest(res, 400, "Invalid request. eventIds should be a non-empty array.");
    }

    // Validate all Event IDs
    const invalidIds = eventIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return response.badRequest(res, 400, "Some provided event IDs are invalid.", invalidIds);
    }

    const result = await Event.updateMany(
      { _id: { $in: eventIds }, createdBy: req.user.userId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() }
    );

    if (result.modifiedCount === 0) {
      return response.badRequest(res, 404, "No matching events found or already deleted.");
    }

    return response.successResponse(res, 200, { modifiedCount: result.modifiedCount }, "Selected events deleted successfully.");
    
  } catch (error) {
    console.error("Error deleting events:", error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};




