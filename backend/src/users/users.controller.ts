import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

// users controller est de crée les routes
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // cette route est pour ajouter un utilisateur
  @Post('register')
  @UsePipes(ValidationPipe)
  postUsers(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.createUsers(createUserDto);
  }
  // cette route est pour connecter un utilisateur
  @Post('login')
  @HttpCode(200)
  loginUsers(@Body() users: any) {
    return this.usersService.loginUsers(users.email, users.password);
  }
  // cette route est afficher les profil qui a aimer l'utilisateur
  @Get('contact/:id')
  getUsersContact(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findByUsersId(id);
  }

  // cette route est pour modifier utilisateur avec sont id
  @Put(':id')
  @UsePipes(ValidationPipe)
  putUser(
    @Body() updateUsersDto: UpdateUsersDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findByUsers(id, updateUsersDto);
  }

  // cette route est pour afficher utilisateur avec sont id
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findByUserId(id);
  }
}
