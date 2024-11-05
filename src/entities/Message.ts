import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({
        type: 'varchar',
        enum: ['client', 'agent']
    })
    role: 'client' | 'agent';

    @Column('timestamp')
    sentAt: Date;

    @ManyToOne(() => Client, client => client.messages)
    client: Client;
}