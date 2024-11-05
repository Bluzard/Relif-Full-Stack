# Relif-Full-Stack

Proyecto de API REST para la gestión de ventas de autos, desarrollado como prueba técnica para Relif. Incluye sistema de manejo de clientes, mensajes y seguimiento de deudas.

## Tecnologías Utilizadas

- Node.js
- TypeScript
- Koa.js
- PostgreSQL
- OpenAI API
- Docker

## Requisitos

- Node.js
- PostgreSQL
- Docker (para despliegue)
- API key de OpenAI

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Bluzard/Relif-Full-Stack.git
   cd Relif-Full-Stack
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear archivo `.env`:

   ```env
   DATABASE_URL=postgres://postgres:admin@localhost:5432/relif
   OPENAI_API_KEY=...
   ```

4. Iniciar servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Endpoints de la API

### Clientes

1. Crear cliente:

   ```bash
   curl -X POST http://localhost:3000/clients \
   -H "Content-Type: application/json" \
   -d '{
       "name": "María Fernández",
       "rut": "22.222.222-2",
       "messages": [
         {
           "text": "Hola, estoy interesada en comprar un auto",
           "sentAt": "2023-07-01T00:00:00.000Z",
           "role": "client"
         }
       ],
       "debts": [
         {
           "amount": 500000,
           "institution": "Ripley",
           "dueDate": "2023-03-15T00:00:00.000Z"
         }
       ]
   }'
   ```

2. Obtener clientes:

   ```bash
   curl http://localhost:3000/clients
   ```

3. Obtener cliente específico:

   ```bash
   curl http://localhost:3000/clients/1
   ```

4. Obtener clientes para seguimiento:

   ```bash
   curl http://localhost:3000/clients-to-do-follow-up
   ```

### Mensajes

1. Agregar mensaje:

   ```bash
   curl -X POST http://localhost:3000/clients/1/message \
   -H "Content-Type: application/json" \
   -d '{
       "text": "¿Tienen el modelo Toyota Corolla disponible?",
       "sentAt": "2023-07-02T00:00:00.000Z",
       "role": "client"
   }'
   ```

2. Generar respuesta IA:

   ```bash
   curl http://localhost:3000/clients/1/generateMessage
   ```

## Generación de Mensajes con IA

La generación de mensajes automáticos se basa en el uso de la API de OpenAI. Se ha implementado un servicio que realiza las siguientes tareas:

- Recupera el historial de mensajes del cliente.
- Analiza el estado de deudas del cliente.
- Consulta la disponibilidad de modelos de autos.
- Genera un mensaje coherente y relevante utilizando un prompt personalizado.

Este proceso iterativo permite obtener respuestas que simulan una conversación natural con un vendedor humano.

## Estructura del Proyecto

```
src/
├── entities/          # Modelos de base de datos
├── controllers/       # Controladores
├── services/         # Lógica de negocio
├── routes/           # Rutas de API
└── index.ts          # Punto de entrada
```

La estructura del proyecto separa las responsabilidades en diferentes módulos, lo que facilita el mantenimiento y escalabilidad del código.

## Despliegue con Docker

1. Construir imagen:

   ```bash
   docker build -t relif-api .
   ```

2. Ejecutar contenedor:

   ```bash
   docker run -p 3000:3000 --env-file .env relif-api
   ```

El despliegue con Docker permite empaquetar toda la aplicación en una imagen y ejecutarla de manera consistente en diferentes entornos.

## Mejoras Propuestas

- Implementar autenticación
- Agregar validación de datos
- Mejorar sistema de IA
- Agregar tests automatizados
- Manejo de inventario de vehículos
- Envío de mensajes programados
