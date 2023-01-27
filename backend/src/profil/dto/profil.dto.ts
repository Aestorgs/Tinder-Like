import { IsNotEmpty } from 'class-validator';
import { Users } from '../../entities/users.entity';

// profil dto pour crée les conditions pour utilisateur
export class CreateProfilDto {
  @IsNotEmpty()
  photo: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  distance: number;

  @IsNotEmpty()
  users: Users;
}

export class UpdateProfilDto {
  @IsNotEmpty()
  photo: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  distance: number;

  @IsNotEmpty()
  users: Users;
}
