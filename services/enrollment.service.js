import mongoose from 'mongoose';
import Formation from '../models/formation.model.js';
import Enrollment from '../models/enrollment.model.js';

export const enrollUserToFormation = async ({ userId, formationId }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Formation avec places disponibles
    const formation = await Formation.findOneAndUpdate(
      {
        _id: formationId,
        availableSpots: { $gt: 0 }
      },
      {
        $inc: { availableSpots: -1 }
      },
      {
        new: true,
        session
      }
    );

    if (!formation) {
      throw new Error('No more spots available or formation not found');
    }

    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      formation: formationId
    }).session(session);

    if (existingEnrollment) {
      throw new Error('User is already enrolled in this formation');
    }

    const enrollment = await Enrollment.create(
      [{
        user: userId,
        formation: formationId,
        status: 'enrolled'
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return enrollment[0];

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
