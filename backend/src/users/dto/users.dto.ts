import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// users dto pour crée les conditions pour utilisateur
export class CreateUsersDto {
  @IsNotEmpty()
  @MinLength(3)
  firstname: string;

  @IsNotEmpty()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @MinLength(3)
  city: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  firstLogs: boolean;
}

export class UpdateUsersDto {
  firstname: string;

  lastname: string;

  city: string;

  email: string;

  password: string;

  firstLogs: boolean;
}
