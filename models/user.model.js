import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'User First Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 50

    },
    lastName:{
        type: String,
        required: [true, 'User Last Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    address: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique:true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password:{
        type: String,
        required: [true, 'User password is required'],
        minLength: 8,
        select: false
    },
    roles: {
        type: [String],
        enum: ['admin', 'trainer', 'trainee', 'center'],
        default: ['trainee'],
    },
    isActive: {
        type: Boolean,
        default: true    
    },
    location: {
        city: String,
        state: String,
        country: String,
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },

}, { timestamps: true, toJSON: { virtuals: true } });

userSchema.virtual('createdFormations', {
    ref: 'Formation',
    localField: '_id',
    foreignField: 'createdBy',
    justOne: false
});

userSchema.virtual('enrolledFormations', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

const User = mongoose.model('User', userSchema);
export default User;