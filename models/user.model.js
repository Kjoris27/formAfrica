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
    phoneNumber: {
        type: String,
        unique:true,
        trim: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid phone number'],
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

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;