import mongoose from "mongoose";
import { ENROLLMENT_STATUS } from '../config/constant.js';

const enrollmentSchema = new mongoose.Schema({
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
  
    status: {
      type: String,
      enum: Object.values(ENROLLMENT_STATUS),
      default: ENROLLMENT_STATUS.ENROLLED
    }
  
  }, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;