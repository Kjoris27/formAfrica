import mongoose from "mongoose";

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
      enum: ['enrolled', 'canceled'],
      default: 'enrolled'
    }
  
  }, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;