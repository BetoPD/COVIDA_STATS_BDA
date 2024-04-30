import { Router } from 'express';
import {
  getSintomasPaciente,
  getFallecidosPorMes,
  getSintomaFatalidad,
  getProfesionesMasAfectadas,
} from '../controllers/patients.controllers.js';

const router = Router();

router.get('/sintomasPaciente', getSintomasPaciente);
router.get('/fallecidosPorMes', getFallecidosPorMes);
router.get('/sintomaFatalidad', getSintomaFatalidad);
router.get('/profesionesMasAfectadas', getProfesionesMasAfectadas);

export default router;
