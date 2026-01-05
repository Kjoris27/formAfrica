import mongoose from 'mongoose';

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
      enum: ['artisanat', 'bricolage', 'cuisine', 'couture', 'finance', 'other'],
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
      enum: ['XOF', 'GHC', 'NGN', 'USD', 'EUR'],
      default: 'XOF'
    },
  
    duration: {
  value: { type: Number, required: true },
  unit: {
    type: String,
    enum: ['hour', 'day', 'week', 'month'],
    required: true
  }
}
,

availableSpots: {
    type: Number,
    min: 0,
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
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
  
   
  
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
  
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
  
    isActive: {
      type: Boolean,
      default: true
    }
  
  }, { timestamps: true });


  formationSchema.pre('save', function (next) {
    if (this.isNew && this.availableSpots == null) {
      this.availableSpots = this.maxStudents;
    }
    next();
  });
  
  
const Formation = mongoose.model('Formation', formationSchema);
export default Formation;