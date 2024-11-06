import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AppDataSource } from './config/database';
import clientRoutes from './routes/client.routes';
import messageRoutes from './routes/message.routes';
import debtRoutes from './routes/debt.routes';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Crear la instancia de Koa
const app = new Koa();

// Middlewares
// Este middleware se encarga de parsear el cuerpo de las peticiones HTTP
app.use(bodyParser());

// Rutas
app.use(clientRoutes.routes());
app.use(clientRoutes.allowedMethods());
app.use(messageRoutes.routes());
app.use(messageRoutes.allowedMethods());
app.use(debtRoutes.routes());
app.use(debtRoutes.allowedMethods());

// Inicializar la conexión a la base de datos y levantar el servidor,el puerto se obtiene desde la variable de entorno PORT o se usa el puerto 3000 por defecto
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log("Database connection error:", error));
