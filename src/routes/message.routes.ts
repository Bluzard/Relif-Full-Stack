
import Router from '@koa/router';
import { clientController } from '../controllers/client.controller';

const messageRouter = new Router({ prefix: '/clients' });

/**
    * Aqui se definen las rutas de la entidad Client para manejar las peticiones HTTP.
    * Se usa a clientController para manejar las peticiones porque este contiene la lógica de negocio.
*/

// Ruta para agregar un mensaje a un cliente
messageRouter.post('/:id/messages', clientController.addMessage);

export default messageRouter;
