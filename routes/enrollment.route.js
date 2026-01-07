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

/**
 * @swagger
 * /api/v1/enrollments:
 *   post:
 *     summary: Enrolls a user to a formation and creates a ticket
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - formation
 *             properties:
 *               formation:
 *                 type: string
 *                 description: The ID of the formation to enroll in.
 *                 example: "60c72b2f9f1d2c001c8e4a1a"
 *     responses:
 *       201:
 *         description: Enrollment and ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Enrollment created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     enrollment:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         user:
 *                           type: string
 *                         formation:
 *                           type: string
 *                         status:
 *                           type: string
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         enrollment:
 *                           type: string
 *                         user:
 *                           type: string
 *                         formation:
 *                           type: string
 *                         qrCodeData:
 *                           type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Formation not found
 *       409:
 *         description: No more spots available or user already enrolled
 *       500:
 *         description: Server error
 */
enrollmentRouter.post('/', authorize, createEnrollment)

enrollmentRouter.put('/:id', updateEnrollment)

enrollmentRouter.delete('/:id', deleteEnrollment)

export default enrollmentRouter;
