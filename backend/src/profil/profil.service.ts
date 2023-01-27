import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profil } from '../entities/profil.entity';
import { Repository } from 'typeorm';
import { CreateProfilDto, UpdateProfilDto } from './dto/profil.dto';

// profil service pour crée les fonctions
@Injectable()
export class ProfilService {
  constructor(
    @InjectRepository(Profil) private readonly profil: Repository<Profil>,
  ) {}

  //cette fonction est pour ajouter un profil
  createProfil(createProfilDto: CreateProfilDto) {
    return this.profil.save(createProfilDto);
  }

  //cette fonction est de modifier un profil avec id
  updateProfil(id: number, updateProfilDto: UpdateProfilDto) {
    return this.profil.update({ id }, updateProfilDto);
  }

  //cette fonction pour afficher tout les profils
  findByUsersProfil() {
    return this.profil.find({
      relations: { users: true },
    });
  }

  //cette fonction est afficher le profil et id
  findByUsers(id: number) {
    return this.profil.findOne({
      relations: { users: true },
      where: { id },
    });
  }
}
