import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from '../entities/profil.entity';

// profil module est pour utiliser les controllers
@Module({
  imports: [TypeOrmModule.forFeature([Profil])],
  controllers: [ProfilController],
  providers: [ProfilService],
})
export class ProfilModule {}
