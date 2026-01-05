import User from '../models/user.model.js';
import Formation from '../models/formation.model.js';
import Enrollment from '../models/enrollment.model.js';

export const getUserWithFormations = async (userId) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const result = {
    user,
    formationsCreated: [],
    formationsEnrolled: []
  };

  if (user.roles.includes('trainer') || user.roles.includes('admin')) {
    result.formationsCreated = await Formation.find({
      createdBy: user._id
    });
  }

  if (user.roles.includes('trainee')) {
    const enrollments = await Enrollment.find({
      user: user._id
    }).populate('formation');

    result.formationsEnrolled = enrollments.map(e => e.formation);
  }

  return result;
};
