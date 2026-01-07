import mongoose from 'mongoose';
import Formation from '../models/formation.model.js';
import Enrollment from '../models/enrollment.model.js';
import Ticket from '../models/ticket.model.js';

export const enrollUserToFormation = async ({ userId, formationId }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const formation = await Formation.findById(formationId).session(session);
  
      if (!formation) {
        const error = new Error('Formation not found');
        error.statusCode = 404;
        throw error;
      }
  
      if (formation.availableSpots <= 0) {
        const error = new Error('No more spots available');
        error.statusCode = 409;
        throw error;
      }
  
      const existingEnrollment = await Enrollment.findOne({
        user: userId,
        formation: formationId
      }).session(session);
  
      if (existingEnrollment) {
        const error = new Error('User is already enrolled in this formation');
        error.statusCode = 409;
        throw error;
      }
  
      formation.availableSpots -= 1;
      await formation.save({ session });
  
      const enrollment = await Enrollment.create(
        [{
          user: userId,
          formation: formationId,
          status: 'enrolled'
        }],
        { session }
      );
  
      const newTicket = await Ticket.create([{
        enrollment: enrollment[0]._id,
        user: userId,
        formation: formationId,
        qrCodeData: `${enrollment[0]._id}-${userId}-${formationId}-${new Date().getTime()}`
      }], { session });

      await session.commitTransaction();
      session.endSession();
  
      return { enrollment: enrollment[0], ticket: newTicket[0] };
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  
