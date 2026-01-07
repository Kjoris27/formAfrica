import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    formation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formation',
        required: true
    },
    qrCodeData: {
        type: String,
        required: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'used'],
        default: 'active'
    }

}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;