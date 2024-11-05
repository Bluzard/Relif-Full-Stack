// src/routes/debt.routes.ts
import Router from '@koa/router';
import { debtController } from '../controllers/debt.controller';

const router = new Router();

// Rutas para deudas
router.get('/clients/:clientId/debts', debtController.getDebtsByClientId);
router.post('/clients/:clientId/debts', debtController.addDebtToClient);
router.put('/debts/:debtId', debtController.updateDebt);
router.delete('/debts/:debtId', debtController.deleteDebt);

export default router;
