# Relif Technical Test - Car Sales Management API

This project implements a REST API for managing car sales leads, messages, and customer debt information. It's built with Node.js, TypeScript, Koa.js, and PostgreSQL.

## 🚀 Features

- Client management system
- Messaging system with AI-powered responses
- Debt tracking for financial pre-qualification
- REST API endpoints for data management
- OpenAI integration for automated responses
- Docker support for easy deployment

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Koa.js
- PostgreSQL
- TypeORM
- OpenAI API
- Docker

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Docker (for containerization)
- OpenAI API key

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/relif-technical-test.git
cd relif-technical-test
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL=postgres://postgres:admin@localhost:5432/relif
```

4. Run database migrations:
```bash
npm run typeorm migration:run
```

5. Start the development server:
```bash
npm run dev
```

## 🐳 Docker Deployment

1. Build the Docker image:
```bash
docker build -t relif-api .
```

2. Run the container:
```bash
docker run -p 3000:3000 --env-file .env relif-api
```

## 🔍 API Testing Guide

### Client Management

1. Create a new client:
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

2. Get all clients:
```bash
curl http://localhost:3000/clients
```

3. Get specific client:
```bash
curl http://localhost:3000/clients/1
```

4. Get clients needing follow-up:
```bash
curl http://localhost:3000/clients-to-do-follow-up
```

### Message Management

1. Add message to client:
```bash
curl -X POST http://localhost:3000/clients/1/message \
-H "Content-Type: application/json" \
-d '{
    "text": "¿Qué modelos tienen disponibles?",
    "sentAt": "2023-12-24T00:00:00.000Z",
    "role": "client"
}'
```

2. Generate AI response:
```bash
curl http://localhost:3000/clients/1/generateMessage
```

## 🤖 AI Message Generation

The AI message generation uses OpenAI's GPT model with a carefully crafted prompt. Here's the prompt engineering process:

1. **Context Setting:**
   - Defined available car brands and models
   - Set up dealership locations
   - Established financing rules based on debt status

2. **Persona Development:**
   - Created a friendly, professional sales agent persona
   - Incorporated automotive expertise
   - Maintained conversational tone

3. **Response Structure:**
   - Greeting and context acknowledgment
   - Information about available vehicles
   - Financing options (if applicable)
   - Next steps and call to action

Example prompt template:
```text
You are María, an experienced car sales agent at AutoMax. You specialize in [brands].
Available locations: [locations].
Customer debt status: [status].

Previous conversation:
[messages]

Respond naturally in Spanish, addressing the customer's interests while following these guidelines:
- Maintain a professional but friendly tone
- Mention specific car models and features
- Discuss financing only if customer has no debt
- Always include a clear next step
```

## 🌟 Potential Improvements

1. **Technical Enhancements:**
   - Add authentication/authorization
   - Implement request validation
   - Add rate limiting for API endpoints
   - Implement WebSocket for real-time messaging
   - Add automated tests

2. **Business Features:**
   - Vehicle inventory management
   - Appointment scheduling
   - Document upload capability
   - Sales pipeline tracking
   - Integration with CRM systems

3. **AI Improvements:**
   - Fine-tune model with actual sales conversations
   - Add sentiment analysis
   - Implement conversation memory
   - Add multilingual support
   - Integrate with calendar for appointment scheduling

## 📚 Project Structure

```
src/
├── entities/          # TypeORM entities
├── controllers/       # Route handlers
├── services/         # Business logic
├── middlewares/      # Custom middlewares
├── routes/           # API routes
├── config/           # Configuration files
├── utils/           # Helper functions
└── index.ts         # Application entry point
```
#   R e l i f - F u l l - S t a c k  
 #   R e l i f - F u l l - S t a c k  
 