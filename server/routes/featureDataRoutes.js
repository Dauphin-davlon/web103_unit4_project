import { Router } from 'express';
import { getAllFeatureData, getFeatureDataById, getFeaturesByGroupId} from '../controllers/featureDataController.js';

const router = Router();

router.get('/', getAllFeatureData);
router.get('/:id', getFeatureDataById);

router.get('/group/:groupId', getFeaturesByGroupId);


export default router;
