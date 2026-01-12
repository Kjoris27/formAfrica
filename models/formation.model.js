import mongoose from 'mongoose';
import { FORMATION_STATUS } from '../config/constant.js';
import { DURATION_UNIT } from '../config/constant.js';
import { STUDENT_LEVEL } from '../config/constant.js';
import { CURRENCY } from '../config/constant.js';
import { FORMATION_CATEGORY } from '../config/constant.js';

const formationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
  
    description: {
      type: String,
      required: true,
      trim: true
    },
  
    category: {
      type: String,
      enum: Object.values(FORMATION_CATEGORY),
      required: true
    },
  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  
    price: {
      type: Number,
      required: true
    },
  
    currency: {
      type: String,
      enum: Object.values(CURRENCY),
      default: CURRENCY.XOF
    },
  
    duration: {
  value: { type: Number, required: true },
  unit: {
    type: String,
    enum: Object.values(DURATION_UNIT),
    default: DURATION_UNIT.HOUR,
    required: true
  }
}
,

availableSpots: {
    type: Number,
    min: 1,
    required: true
  },

  startDate: {
    type: Date, 
    required: true
  },

  endDate: {
    type: Date
  },
  
    level: {
      type: String,
      enum: Object.values(STUDENT_LEVEL),
      default: STUDENT_LEVEL.BEGINNER
    },
  
   
  
    status: {
      type: String,
      enum: Object.values(FORMATION_STATUS),
default: FORMATION_STATUS.DRAFT    },
  
    location: {
  address: String,
  city: String,
  country: String,
  geo: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true
    }
  }
}
,
  
    isActive: {
      type: Boolean,
      default: true
    }
  
  }, { timestamps: true });

formationSchema.index({ 'location.geo': '2dsphere' });


  
  
  
const Formation = mongoose.model('Formation', formationSchema);
export default Formation;