import { Router } from 'express';
import {
    createEnrollment,
    getEnrollments,
    getEnrollment,
    updateEnrollment,
    deleteEnrollment,
} from '../controllers/enrollment.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const enrollmentRouter = Router();



enrollmentRouter.get('/', getEnrollments)

enrollmentRouter.get('/:id', getEnrollment)

enrollmentRouter.post('/', authorize, createEnrollment)

enrollmentRouter.put('/:id', updateEnrollment)

enrollmentRouter.delete('/:id', deleteEnrollment)

export default enrollmentRouter;
