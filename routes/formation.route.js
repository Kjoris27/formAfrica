import express from 'express';
import {
    createFormation,
    updateFormation,
    getAllFormations
 
} from '../controllers/formation.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import restrictTo from "../middlewares/role.middleware.js";
import { findFormationsNearBy } from '../controllers/formation.controller.js';


const FormationRouter = express.Router();   

/**
 * @swagger
 * /api/v1/formations:
 *   get:
 *     summary: Get all formations
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Formations fetched successfully
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
 *                   example: "Formations fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/formations/nearby:
 *   get:
 *     summary: Get formations near by a location
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         description: The latitude of the location
 *         example: 37.774929
 *       - name: lng
 *         in: query
 *         required: true
 *         description: The longitude of the location
 *         example: -122.419416
 *       - name: distance
 *         in: query
 *         required: true
 *         description: The distance in kilometers
 *         example: 10
 *     responses:
 *       200:
 *         description: Formations fetched successfully
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
 *                   example: "Formations fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

FormationRouter.get('/',authorize,restrictTo('trainer', 'admin'), getAllFormations);

FormationRouter.get('/nearby',authorize,findFormationsNearBy);
// FormationRouter.get('/:id', getFormation);

FormationRouter.post('/',authorize,restrictTo('trainer', 'admin'),  createFormation);

FormationRouter.put('/:id',authorize,restrictTo('trainer', 'admin'), updateFormation);

// FormationRouter.delete('/:id', deleteFormation);

export default FormationRouter;
