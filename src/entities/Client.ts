import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './Message';
import { Debt } from './Debt';

/**
    * Clase que representa a un cliente en la base de datos.
    * Un cliente tiene un nombre y un RUT.
    * Se relaciona con la entidad de Mensaje (Message) a través de una relación OneToMany.
    * De esta manera se pueden obtener todos los mensajes enviados por un cliente en particular.
    * Se relaciona con la entidad de Deuda (Debt) a través de una relación OneToMany.
    * De esta manera se pueden obtener todas las deudas de un cliente en particular.
    * Se establecen parametros iniciales para el nombre y el RUT.
*/
@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string = '';

    @Column()
    rut: string = '';

    @OneToMany(() => Message, message => message.client)
    messages!: Message[];



    @OneToMany(() => Debt, debt => debt.client)
    debts!: Debt[];
}
