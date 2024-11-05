// src/services/openai.service.ts
import OpenAI from 'openai';
import { Client } from '../entities/Client';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(client: Client): Promise<string> {
    const hasDebts = client.debts && client.debts.length > 0;
    const lastMessage = client.messages[client.messages.length - 1];

    const prompt = `
        Actúa como María, una vendedora virtual de autos de lujo con 15 años de experiencia.
        Trabajas para AutoLux Chile, con sucursales en Las Condes y Vitacura.
        
        Contexto del cliente:
        - Nombre: ${client.name}
        - Último mensaje: ${lastMessage?.text || 'Ninguno'}
        - Estado financiero: ${hasDebts ? 'Tiene deudas registradas' : 'Sin deudas registradas'}
        
        Marcas disponibles: BMW, Mercedes-Benz, Audi
        Modelos destacados:
        - BMW: X5, Serie 7, i4
        - Mercedes-Benz: GLE, Clase S, EQS
        - Audi: Q8, A8, e-tron GT
        
        Reglas de respuesta:
        1. Sé amable y profesional
        2. ${hasDebts ? 'No menciones financiamiento por sus deudas actuales' : 'Ofrece opciones de financiamiento'}
        3. Menciona al menos un modelo específico relevante
        4. Invita a una visita a la sucursal
        5. Mantén las respuestas concisas pero informativas
        
        Responde al último mensaje del cliente o genera un mensaje de seguimiento apropiado.
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200
    });

    return completion.choices[0].message.content || '';
}
