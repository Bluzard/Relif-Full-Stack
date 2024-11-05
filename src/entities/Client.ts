// src/entities/Client.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './Message';
import { Debt } from './Debt';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rut: string;

    @OneToMany(() => Message, message => message.client)
    messages: Message[];

    @OneToMany(() => Debt, debt => debt.client)
    debts: Debt[];
}
