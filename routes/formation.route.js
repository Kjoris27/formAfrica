import express from 'express';
import {
    createFormation,
    getFormations,
    getFormation,
    updateFormation,
    deleteFormation,
} from '../controllers/formation.controller.js';

const FormationRouter = express.Router();



FormationRouter.get('/', getFormations);

FormationRouter.get('/:id', getFormation);

FormationRouter.post('/', createFormation);

FormationRouter.put('/:id', updateFormation);

FormationRouter.delete('/:id', deleteFormation);

export default FormationRouter;
