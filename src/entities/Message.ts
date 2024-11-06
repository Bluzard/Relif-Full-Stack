import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';

/**
    * Clase que representa un mensaje enviado por un cliente.
    * Este se relaciona con el ID del cliente que lo envió.
    * El rol del mensaje puede ser 'client' o ' agent'. Este permite diferenciar si el mensaje fue enviado por el cliente o por el agente.
    * El agente en este caso es el sistema que genera mensajes usando la API de OpenAI.
*/

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text: string = '';

    @Column({
        type: 'varchar',
        enum: ['client', 'agent']
    })
    role!: 'client' | 'agent';

    @Column('timestamp')
    sentAt: Date = new Date();

    @ManyToOne(() => Client, client => client.messages)
    client!: Client;
}