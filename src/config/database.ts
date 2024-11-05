// src/config/database.ts
import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Message } from "../entities/Message";
import { Debt } from "../entities/Debt";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // En producción debería ser false
    logging: false,
    entities: [Client, Message, Debt],
});