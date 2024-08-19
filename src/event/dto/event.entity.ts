import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export type EventDocument = Event & Document;

@Entity()
export class Event{

    @PrimaryGeneratedColumn()
    eventId: number;

    @Column({ type: 'varchar', length: 55 })
    eventName: string;

    @Column()
    eventStatement: string;

    @Column()
    context: string;

    @Column()
    eventDate: string;

    @Column()
    place: string;

    @Column({ type: 'varchar', length: 55 })
    createdBy: string;
};