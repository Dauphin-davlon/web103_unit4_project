import { Router } from 'express';
import { updateLaptopById,deleteLaptopById,getAllLaptopsWithFeatures,createLaptop,getAllLaptops, getLaptopById } from '../controllers/laptopController.js';

const router = Router();

router.get('/', getAllLaptopsWithFeatures);
router.get('/:id', getLaptopById);
router.post('/', createLaptop);
router.delete('/:id', deleteLaptopById);
router.put('/:id',updateLaptopById)


export default router;
