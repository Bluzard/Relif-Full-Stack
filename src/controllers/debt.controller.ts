// src/controllers/debt.controller.ts
import { Context } from 'koa';
import { AppDataSource } from '../config/database';
import { Debt } from '../entities/Debt';
import { Client } from '../entities/Client';

const debtRepository = AppDataSource.getRepository(Debt);
const clientRepository = AppDataSource.getRepository(Client);

export const debtController = {
    // Obtener todas las deudas de un cliente por su ID
    getDebtsByClientId: async (ctx: Context) => {
        try {
            const clientId = parseInt(ctx.params.clientId);
            const client = await clientRepository.findOneBy({ id: clientId });

            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            const debts = await debtRepository.find({
                where: { client: { id: clientId } }
            });

            ctx.body = debts;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error fetching debts for client" };
        }
    },

    // Crear una nueva deuda asociada a un cliente
    addDebtToClient: async (ctx: Context) => {
        try {
            const clientId = parseInt(ctx.params.clientId);
            const client = await clientRepository.findOneBy({ id: clientId });

            if (!client) {
                ctx.status = 404;
                ctx.body = { error: "Client not found" };
                return;
            }

            const { institution, amount, dueDate } = ctx.request.body;
            const debt = debtRepository.create({
                institution,
                amount,
                dueDate,
                client
            });

            await debtRepository.save(debt);
            ctx.body = debt;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error adding debt" };
        }
    },

    // Actualizar una deuda por su ID
    updateDebt: async (ctx: Context) => {
        try {
            const debtId = parseInt(ctx.params.debtId);
            const { institution, amount, dueDate } = ctx.request.body;

            const debt = await debtRepository.findOneBy({ id: debtId });

            if (!debt) {
                ctx.status = 404;
                ctx.body = { error: "Debt not found" };
                return;
            }

            debt.institution = institution;
            debt.amount = amount;
            debt.dueDate = dueDate;

            await debtRepository.save(debt);
            ctx.body = debt;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error updating debt" };
        }
    },

    // Eliminar una deuda por su ID
    deleteDebt: async (ctx: Context) => {
        try {
            const debtId = parseInt(ctx.params.debtId);
            const result = await debtRepository.delete(debtId);

            if (result.affected === 0) {
                ctx.status = 404;
                ctx.body = { error: "Debt not found" };
                return;
            }

            ctx.body = { message: "Debt deleted successfully" };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error deleting debt" };
        }
    }
};
