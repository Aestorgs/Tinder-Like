import { IsNotEmpty } from 'class-validator';
import { Profil } from '../../entities/profil.entity';
import { Users } from '../..//entities/users.entity';

// home dto pour crée les conditions pour utilisateur
export class CreateHomeDto {
  @IsNotEmpty()
  profil: Profil;

  like: Profil;

  dislike: Profil;

  @IsNotEmpty()
  users: Users;

  @IsNotEmpty()
  usersId: Users;
}
