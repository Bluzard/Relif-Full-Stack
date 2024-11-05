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

- Node.js (v16 o superior)
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
    "name": "Juan Perez",
    "rut": "11.111.111-1",
    "messages": [
      {
        "text": "Hola, quiero comprar un auto",
        "sentAt": "2023-12-24T00:00:00.000Z",
        "role": "client"
      }
    ],
    "debts": [
      {
        "amount": 1000000,
        "institution": "Banco Estado",
        "dueDate": "2023-12-24T00:00:00.000Z"
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
    "text": "¿Qué modelos tienen disponibles?",
    "sentAt": "2023-12-24T00:00:00.000Z",
    "role": "client"
}'
```

2. Generar respuesta IA:
```bash
curl http://localhost:3000/clients/1/generateMessage
```

## Generación de Mensajes con IA

El sistema utiliza OpenAI para generar respuestas automáticas considerando:
- Historial de conversación
- Estado de deudas del cliente
- Modelos de autos disponibles
- Ubicaciones de venta

## Estructura del Proyecto

```
src/
├── entities/          # Modelos de base de datos
├── controllers/       # Controladores
├── services/         # Lógica de negocio
├── routes/           # Rutas de API
└── index.ts          # Punto de entrada
```

## Despliegue con Docker

1. Construir imagen:
```bash
docker build -t relif-api .
```

2. Ejecutar contenedor:
```bash
docker run -p 3000:3000 --env-file .env relif-api
```

## Mejoras Propuestas

- Implementar autenticación
- Agregar validación de datos
- Mejorar sistema de IA
- Agregar tests automatizados
- Manejo de inventario de vehículos