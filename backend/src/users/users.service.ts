import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';

// users service pour crée les fonctions
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
  ) {}

  //cette fonction est pour ajouter un utilisateur
  async createUsers(createUserDto: CreateUsersDto) {
    const users = this.users.create(createUserDto);
    users.password = await bcrypt.hash(users.password, 10);
    return this.users.save(users);
  }

  //cette fonction est pour conneter un utilisateur
  async loginUsers(email: string, password: string) {
    const users = await this.users.findOne({
      select: ['id', 'password', 'firstLogs'],
      where: { email },
    });
    if (await bcrypt.compare(password, users.password))
      return { users: users.id, firstLogs: users.firstLogs };
    else
      throw new BadRequestException('erreur email or password', {
        cause: new Error(),
      });
  }
  //cette fonction est pour afficher le profil , les likes, utilisateur qui est été liker
  findByUsersId(id: number) {
    return this.users.findOne({
      relations: {
        home: { profil: true, like: true, usersId: true },
      },
      where: { id },
    });
  }

  //cette fonction pour modifier utilisateur
  async findByUsers(id: number, updateUsersDto: UpdateUsersDto) {
    if (updateUsersDto.password) {
      updateUsersDto.password = await bcrypt.hash(updateUsersDto.password, 10);
    }
    return await this.users.update(id, updateUsersDto);
  }

  //cette fonction est de afficher utilisateur avec id
  findByUserId(id: number) {
    return this.users.findOne({
      where: { id },
    });
  }
}
