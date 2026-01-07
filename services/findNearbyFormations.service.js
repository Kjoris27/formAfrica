import Formation from '../models/formation.model.js';

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
