import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    response: {
      type: String,
      enum: ['yes', 'no', 'maybe'],
      default: 'yes',
    },
  },
  { timestamps: true }
);

export default mongoose.model('RSVP', rsvpSchema);