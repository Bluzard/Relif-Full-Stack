// src/entities/Debt.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Debt {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    institution: string = '';

    @Column('integer')
    amount: number = 0;

    @Column('timestamp')
    dueDate: Date = new Date();

    @ManyToOne(() => Client, client => client.debts)
    client!: Client;
}