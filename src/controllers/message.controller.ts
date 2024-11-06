// src/controllers/message.controller.ts
import { Context } from 'koa';
import { AppDataSource } from '../config/database';
import { Message } from '../entities/Message';
import { Client } from '../entities/Client';

const messageRepository = AppDataSource.getRepository(Message);
const clientRepository = AppDataSource.getRepository(Client);

/**
    * Controlador para manejar los mensajes
    * Se utiliza al cliente para relacionar los mensajes.
    * De esta manera se puede obtener los mensajes de un cliente en particular.
    * CRUD de mensajes.
*/

export const messageController = {
    getAllMessages: async (ctx: Context) => {
        try {
            const messages = await messageRepository.find({ relations: ['client'] });
            ctx.body = messages;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error fetching messages" };
        }
    },

    // Obtener un mensaje por su ID
    getMessageById: async (ctx: Context) => {
        try {
            const message = await messageRepository.findOne({
                where: { id: parseInt(ctx.params.id) },
                relations: ['client']
            });

            if (!message) {
                ctx.status = 404;
                ctx.body = { error: "Message not found" };
                return;
            }

            ctx.body = message;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error fetching message" };
        }
    },

    // Crear un mensaje
    createMessage: async (ctx: Context) => {
        try {
            const { text, role, clientId } = ctx.request.body as { text: string, role: string, clientId: number };

            const client = await clientRepository.findOneBy({ id: clientId });
            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            const message = messageRepository.create({
                text,
                role: role as 'client' | 'agent',
                sentAt: new Date(),
                client
            });

            await messageRepository.save(message);
            ctx.body = message;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error creating message" };
        }
    },

    // Actualizar un mensaje
    updateMessage: async (ctx: Context) => {
        try {
            const messageId = parseInt(ctx.params.id);
            const message = await messageRepository.findOneBy({ id: messageId });

            if (!message) {
                ctx.status = 404;
                ctx.body = { error: "Message not found" };
                return;
            }

            const { text, role } = ctx.request.body as { text: string, role: string };
            message.text = text || message.text;
            if (role === 'client' || role === 'agent') {
                message.role = role;
            }

            await messageRepository.save(message);
            ctx.body = message;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error updating message" };
        }
    },

    // Eliminar un mensaje
    deleteMessage: async (ctx: Context) => {
        try {
            const messageId = parseInt(ctx.params.id);
            const message = await messageRepository.findOneBy({ id: messageId });

            if (!message) {
                ctx.status = 404;
                ctx.body = { error: "Message not found" };
                return;
            }

            await messageRepository.remove(message);
            ctx.status = 204; 
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error deleting message" };
        }
    }
};
