import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Message } from "../entities/Message";
import { Debt } from "../entities/Debt";
import dotenv from 'dotenv';

dotenv.config();

/**
    * Configuracion para conectar a la base de datos
    * La url permite la conexion a la base de datos esta deberia ser una variable entorno como buena practica pero aqui se puede agregar directamente.
    * Se utilizo postgres como motor de base de datos y se sincroniza con la base de datos para que las entidades se creen automaticamente.
*/

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:admin@host.docker.internal:5432/relif",
    synchronize: true, 
    logging: false,
    entities: [Client, Message, Debt],
});