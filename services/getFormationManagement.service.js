import Formation from '../models/formation.model.js';
import Enrollment from '../models/enrollment.model.js';

export const getFormationManagement = async ({ formationId, requester }) => {
  const formation = await Formation.findById(formationId)
    .populate('createdBy', 'firstName lastName email');

  if (!formation) {
    const error = new Error('Formation not found');
    error.statusCode = 404;
    throw error;
  }

  const isOwner = formation.createdBy._id.toString() === requester._id.toString();
  const isAdmin = requester.roles.includes('admin');

  if (!isOwner && !isAdmin) {
    const error = new Error('Access denied');
    error.statusCode = 403;
    throw error;
  }

  const enrollments = await Enrollment.find({
    formation: formationId
  }).populate('user', 'firstName lastName email');

  return {
    formation,
    stats: {
      totalEnrolled: enrollments.length,
      availableSpots: formation.availableSpots
    },
    participants: enrollments.map(e => ({
      _id: e.user._id,
      firstName: e.user.firstName,
      lastName: e.user.lastName,
      email: e.user.email,
      status: e.status
    }))
  };
};
