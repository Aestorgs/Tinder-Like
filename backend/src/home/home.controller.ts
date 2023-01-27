import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/home.dto';

// home controller est de crée les routes
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // cette route est pour ajouter les profil qui aime
  @Post()
  @UsePipes(ValidationPipe)
  postHome(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.createHome(createHomeDto);
  }
}
