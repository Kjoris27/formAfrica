import mongoose from 'mongoose';

const formationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Formation name is required'],
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    description: {
        type: String,
        required: [true, 'Formation description is required'],
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    category: {
        type: String,
        enum: ['artisanat', 'bricolage', 'cuisine', 'couture', 'other'],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    price: {
        type: Number,
        required: [true, 'Formation price is required'],
    },
    currency: {
        type: String,
        enum: ['XOF', 'GHC', 'NGN', 'USD', 'EUR'],
        required: [true, 'Formation currency is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Formation duration is required'],
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });