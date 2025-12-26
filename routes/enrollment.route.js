import { Router } from 'express';
import {
    createEnrollment,
    getEnrollments,
    getEnrollment,
    updateEnrollment,
    deleteEnrollment,
} from '../controllers/enrollment.controller.js';

const enrollmentRouter = Router();



enrollmentRouter.get('/', getEnrollments)

enrollmentRouter.get('/:id', getEnrollment)

enrollmentRouter.post('/', createEnrollment)

enrollmentRouter.put('/:id', updateEnrollment)

enrollmentRouter.delete('/:id', deleteEnrollment)

export default enrollmentRouter;
