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
/**
 * @swagger
 * /api/v1/formations:
 *   post:
 *     summary: Create a new formation
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - price
 *               - currency
 *               - duration
 *               - availableSpots
 *               - startDate
 *               - location
 *               - isActive
 *              
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the formation
 *                 example: "Formation 1"
 *               description:
 *                 type: string
 *                 description: The description of the formation
 *                 example: "Description of the formation"
 *               category:
 *                 type: string
 *                 description: The category of the formation
 *                 example: "Artisanat"
 *               price:
 *                 type: number
 *                 description: The price of the formation
 *                 example: 10000
 *               currency:
 *                 type: string
 *                 description: The currency of the formation
 *                 example: "XOF"
 *               duration:
 *                 type: object
 *                 description: The duration of the formation
 *                 example: { value: 1, unit: "hour" }
 *               availableSpots:
 *                 type: number
 *                 description: The available spots of the formation
 *                 example: 10
 *               startDate:
 *                 type: string
 *                 description: The start date of the formation
 *                 example: "2026-01-01"
 *               location:
 *                 type: object
 *                 description: The location of the formation
 *                 example: { address: "123 Main St", city: "New York", country: "United States" }
 *               isActive:
 *                 type: boolean
 *                 description: The active status of the formation
 *                 example: true
 *     responses:
 *       201:
 *         description: Formation created successfully
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
 *                   example: "Formation created successfully"
 *                 data:
 *                   type: object
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
 *      400:
 *         description: Bad request
 *      409:
 *         description: Formation already exists
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Formation not found
 *      500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/formations/:id:
 *   put:
 *     summary: Update a formation
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the formation to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the formation
 *                 example: "Formation mise à jour"
 *               description:
 *                 type: string
 *                 description: The description of the formation
 *                 example: "Description de la formation mise à jour"
 *               category:
 *                 type: string
 *                 description: The category of the formation
 *                 example: "Informatique"
 *               price:
 *                 type: number
 *                 description: The price of the formation
 *                 example: 12000
 *               currency:
 *                 type: string
 *                 description: The currency of the formation
 *                 example: "XOF"
 *               duration:
 *                 type: object
 *                 description: The duration of the formation
 *                 example: { value: 2, unit: "days" }
 *               availableSpots:
 *                 type: number
 *                 description: The available spots of the formation
 *                 example: 15
 *               startDate:
 *                 type: string
 *                 description: The start date of the formation
 *                 example: "2026-02-01"
 *               location:
 *                 type: object
 *                 description: The location of the formation
 *                 example: { address: "456 Side Rd", city: "Dakar", country: "Senegal" }
 *               isActive:
 *                 type: boolean
 *                 description: The active status of the formation
 *                 example: false
 *     responses:
 *       200:
 *         description: Formation updated successfully
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
 *                   example: "Formation updated successfully"
 *                 data:
 *                   type: object
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Formation not found
 *       500:
 *         description: Server error
 *//**
 * @swagger
 * /api/v1/formations/:id:
 *   delete:
 *     summary: Delete a formation
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 */
FormationRouter.get('/',authorize,restrictTo('trainer', 'admin'), getAllFormations);

FormationRouter.get('/nearby',authorize,findFormationsNearBy);
// FormationRouter.get('/:id', getFormation);

FormationRouter.post('/',authorize,restrictTo('trainer', 'admin'),  createFormation);

FormationRouter.put('/:id',authorize,restrictTo('trainer', 'admin'), updateFormation);

// FormationRouter.delete('/:id', deleteFormation);

export default FormationRouter;
