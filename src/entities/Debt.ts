// src/entities/Debt.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';


/**
    * Clase que representa una deuda de un cliente.
    * Este se relaciona con el ID del cliente que la tiene.
    * La deuda tiene un monto, una fecha de vencimiento y la institución a la que se le debe.
    * La fecha de vencimiento es un campo obligatorio.
    * Se asignan valores por defecto a los campos de la deuda.
    * La relación con el cliente es de muchos a uno.
*/
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