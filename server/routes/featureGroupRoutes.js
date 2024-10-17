import { Router } from 'express';
import { getAllFeatureGroups, getFeatureGroupById } from '../controllers/featureGroupController.js';

const router = Router();

router.get('/', getAllFeatureGroups);
router.get('/:id', getFeatureGroupById);

export default router;
