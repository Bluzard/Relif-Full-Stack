// src/routes/message.routes.ts
import Router from '@koa/router';
import { clientController } from '../controllers/client.controller';

const messageRouter = new Router({ prefix: '/clients' });

// Ruta para agregar un mensaje a un cliente
messageRouter.post('/:id/messages', clientController.addMessage);

export default messageRouter;
