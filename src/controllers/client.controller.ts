import { Context } from 'koa';
import { AppDataSource } from '../config/database';
import { Client } from '../entities/Client';
import { Message } from '../entities/Message';
import { Debt } from '../entities/Debt';
import { LessThan, MoreThan } from 'typeorm';
import { generateResponse } from '../services/openai.service';

const clientRepository = AppDataSource.getRepository(Client);
const messageRepository = AppDataSource.getRepository(Message);
const debtRepository = AppDataSource.getRepository(Debt);


/**
    * Controlador para manejar los clientes
    * Los métodos de este controlador permiten obtener, crear y actualizar clientes.
    * También permite obtener los clientes que necesitan seguimiento y generar mensajes para los clientes.
    * Estos metodos son usados por las rutas definidas en src/routes/client.routes.ts para manejar las peticiones HTTP.
*/

export const clientController = {
    // Obtener todos los clientes
    getAllClients: async (ctx: Context) => {
        try {
            // Solo devolvemos los campos requeridos
            const clients = await clientRepository
                .createQueryBuilder('client')
                .select(['client.id', 'client.name', 'client.rut'])
                .getMany();

            ctx.body = clients;
        } catch (error) {
            console.error("Error in getAllClients:", error);
            ctx.status = 500;
            ctx.body = { error: "Error fetching clients" };
        }
    },

    // Obtener un cliente por su id
    getClientById: async (ctx: Context) => {
        try {
            const client = await clientRepository.findOne({
                where: { id: parseInt(ctx.params.id) },
                relations: ['messages', 'debts'],
                order: {
                    messages: {
                        sentAt: 'ASC'
                    }
                }
            });

            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            ctx.body = client;
        } catch (error) {
            console.error("Error in getClientById:", error);
            ctx.status = 500;
            ctx.body = { error: "Error fetching client" };
        }
    },

    // Obtener los clientes que necesitan seguimiento
    getClientsToFollowUp: async (ctx: Context) => {
        try {
            console.log("Fetching clients for follow-up");
            
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            // Subquery para obtener el último mensaje de cada cliente
            const clients = await clientRepository
                .createQueryBuilder("client")
                .select(['client.id', 'client.name', 'client.rut'])
                .leftJoin('client.messages', 'message')
                .where(qb => {
                    const subQuery = qb
                        .subQuery()
                        .select('MAX(m.sentAt)')
                        .from(Message, 'm')
                        .where('m.clientId = client.id')
                        .getQuery();
                    return `${subQuery} < :sevenDaysAgo`;
                })
                .setParameter('sevenDaysAgo', sevenDaysAgo)
                .getMany();

            console.log(`Found ${clients.length} clients needing follow-up`);
            
            ctx.body = clients;
        } catch (error) {
            console.error("Error in getClientsToFollowUp:", error);
            ctx.status = 500;
            ctx.body = { error: "Error fetching clients for follow-up" };
        }
    },

    // Crear un nuevo cliente
    createClient: async (ctx: Context) => {
        try {
            const { name, rut, messages = [], debts = [] } = ctx.request.body as { name: string, rut: string, messages?: any[], debts?: any[] };

            // Crear el cliente
            const client = clientRepository.create({ name, rut });
            await clientRepository.save(client);

            // Crear mensajes
            if (messages.length > 0) {
                const messageEntities = messages.map((msg: any) => 
                    messageRepository.create({
                        text: msg.text,
                        role: msg.role,
                        sentAt: new Date(msg.sentAt),
                        client
                    })
                );
                await messageRepository.save(messageEntities);
            }

            // Crear deudas
            if (debts.length > 0) {
                const debtEntities = debts.map((debt: any) => 
                    debtRepository.create({
                        institution: debt.institution,
                        amount: debt.amount,
                        dueDate: new Date(debt.dueDate),
                        client
                    })
                );
                await debtRepository.save(debtEntities);
            }

            // Devolver el cliente creado con sus relaciones
            const savedClient = await clientRepository.findOne({
                where: { id: client.id },
                relations: ['messages', 'debts'],
                order: {
                    messages: {
                        sentAt: 'ASC'
                    }
                }
            });

            ctx.status = 201;
            ctx.body = savedClient;
        } catch (error) {
            console.error("Error in createClient:", error);
            ctx.status = 500;
            ctx.body = { error: "Error creating client" };
        }
    },

    // Agregar un mensaje a un cliente
    addMessage: async (ctx: Context) => {
        try {
            const clientId = parseInt(ctx.params.id);
            const { text, role, sentAt } = ctx.request.body as { text: string, role: string, sentAt?: string };

            const client = await clientRepository.findOneBy({ id: clientId });
            
            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            const message = messageRepository.create({
                text,
                role: role as 'client' | 'agent',
                sentAt: new Date(sentAt || Date.now()),
                client
            });

            await messageRepository.save(message);
            
            ctx.status = 201;
            ctx.body = message;
        } catch (error) {
            console.error("Error in addMessage:", error);
            ctx.status = 500;
            ctx.body = { error: "Error adding message" };
        }
    },

    // Generar un mensaje para un cliente
    generateMessage: async (ctx: Context) => {
        try {
            const client = await clientRepository.findOne({
                where: { id: parseInt(ctx.params.id) },
                relations: ['messages', 'debts']
            });

            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            const generatedMessage = await generateResponse(client);
            
            // Guardar el mensaje generado
            const message = messageRepository.create({
                text: generatedMessage,
                role: 'agent',
                sentAt: new Date(),
                client
            });

            await messageRepository.save(message);

            ctx.body = { text: generatedMessage };
        } catch (error) {
            console.error("Error in generateMessage:", error);
            ctx.status = 500;
            ctx.body = { error: "Error generating message" };
        }
    }
};