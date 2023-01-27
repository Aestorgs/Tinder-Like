import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from '../entities/home.entity';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dto/home.dto';

// home service pour crée les fonctions
@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) private readonly home: Repository<Home>,
  ) {}

  // cette fonction est pour ajouter les profils qui aime
  createHome(createHomeDto: CreateHomeDto) {
    const profil = this.home.create(createHomeDto);
    return this.home.save(profil);
  }
}
