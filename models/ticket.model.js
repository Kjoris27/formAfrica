import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TICKET_STATUS } from '../config/constant.js';


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
        enum: Object.values(TICKET_STATUS),
        default: TICKET_STATUS.ACTIVE
    }

}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;