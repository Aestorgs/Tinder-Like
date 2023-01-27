import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home.entity';

// crée la une table users et les colonnes
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  city: string;

  @Column()
  age: number;

  @Column()
  sexe: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstLogs: boolean;

  @OneToMany(() => Home, (home) => home.users)
  home: Home[];
}
