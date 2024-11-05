// src/index.ts
import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AppDataSource } from './config/database';
import clientRoutes from './routes/client.routes';
import messageRoutes from './routes/message.routes';
import debtRoutes from './routes/debt.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();

// Middlewares
app.use(bodyParser());

// Routes
app.use(clientRoutes.routes());
app.use(clientRoutes.allowedMethods());
app.use(messageRoutes.routes());
app.use(messageRoutes.allowedMethods());
app.use(debtRoutes.routes());
app.use(debtRoutes.allowedMethods());

// Initialize database connection and start server
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log("Database connection error:", error));
