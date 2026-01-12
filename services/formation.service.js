import Formation from '../models/formation.model.js';
import Enrollment from '../models/enrollment.model.js';
import User from '../models/user.model.js';





export const findNearbyFormations = async (lat, lng, radius = 10) => {
  try {
    return Formation.find({
        status: 'published',
        availableSpots: { $gt: 0 },
      'location.geo': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radius * 1000 
        }
      }
    }).select('title category price startDate location');
  } catch (error) {
    throw new Error(`Error finding nearby formations: ${error.message}`);
  }
};


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

