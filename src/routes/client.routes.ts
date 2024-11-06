import Router from '@koa/router';
import { clientController } from '../controllers/client.controller';

const router = new Router({ prefix: '/clients' });

/**
    * Aqui se definen las rutas de la entidad Client para manejar las peticiones HTTP.
*/

// Lista de clientes y creación
router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);

// Ruta de follow-up
router.get('/clients-to-do-follow-up', clientController.getClientsToFollowUp);

// Rutas específicas de cliente
router.get('/:id', clientController.getClientById);
router.post('/:id/message', clientController.addMessage);
router.get('/:id/generateMessage', clientController.generateMessage);

export default router;