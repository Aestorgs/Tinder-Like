import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profil } from './profil.entity';
import { Users } from './users.entity';

// home entity est de crée la une table home et les colonnes
@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profil, (profil) => profil.profil)
  profil: Profil;

  @ManyToOne(() => Profil, (profil) => profil.profil)
  like: Profil;

  @ManyToOne(() => Profil, (profil) => profil.profil)
  dislike: Profil;

  @ManyToOne(() => Users, (users) => users.id)
  users: Users;

  @ManyToOne(() => Users, (users) => users.id)
  usersId: Users;
}
