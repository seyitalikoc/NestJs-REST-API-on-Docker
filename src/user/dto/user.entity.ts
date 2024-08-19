import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  user_id: number;
    
  @Column({ type: 'varchar', length: 55 })
  name: string;

  @Column({ type: 'varchar', length: 55})
  username: string;

  @Column({ type: 'varchar', length: 55 })
  password: string;

  @Column({type: 'varchar', })
  mail : string;

  @Column("int", { array: true })
  registered_events : number[];
}