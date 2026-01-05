import express from 'express';
import {
    createFormation,
    updateFormation,
    getAllFormations
 
} from '../controllers/formation.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import restrictTo from "../middlewares/role.middleware.js";


const FormationRouter = express.Router();   



FormationRouter.get('/',authorize,restrictTo('trainer', 'admin'), getAllFormations);

// FormationRouter.get('/:id', getFormation);

FormationRouter.post('/',authorize,restrictTo('trainer', 'admin'),  createFormation);

FormationRouter.put('/:id',authorize,restrictTo('trainer', 'admin'), updateFormation);

// FormationRouter.delete('/:id', deleteFormation);

export default FormationRouter;
