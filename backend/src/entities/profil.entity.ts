import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

// profil entity est de crée la une table profil et les colonnes
@Entity('profil')
export class Profil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @Column()
  description: string;

  @Column()
  distance: number;

  @OneToMany(() => Profil, (id) => id.profil)
  profil: Profil;

  @ManyToOne(() => Users, (users) => users.id)
  users: Users;
}
