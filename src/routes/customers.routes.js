import { Router } from 'express';
import { getQuery } from '../controllers/customers.controllers.js';

const router = Router();

router.get('/getQuery', getQuery);

export default router;
