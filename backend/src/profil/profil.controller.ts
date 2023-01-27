import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfilService } from './profil.service';
import { CreateProfilDto, UpdateProfilDto } from './dto/profil.dto';

// profil controller est de crée les routes
@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  // cette route est pour ajouter un profil
  @Post()
  @UsePipes(ValidationPipe)
  postProfil(@Body() createProfilDto: CreateProfilDto) {
    return this.profilService.createProfil(createProfilDto);
  }

  // cette route est pour modifier un profil avec sont id
  @Put(':id')
  @UsePipes(ValidationPipe)
  putUser(
    @Body() updateProfilDto: UpdateProfilDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profilService.updateProfil(id, updateProfilDto);
  }

  // cette route est pour afficher tout les profils
  @Get()
  findByUsersProfil() {
    return this.profilService.findByUsersProfil();
  }

  // cette route est pour afficher le profils et id
  @Get(':id')
  getUsers(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.findByUsers(id);
  }
}
