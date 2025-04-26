import { Body,Controller,Get,Param,Patch,Post,Delete,Query,ParseIntPipe,ValidationPipe,UsePipes,} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private static readonly validationPipeOptions = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes(UserController.validationPipeOptions)
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @UsePipes(UserController.validationPipeOptions)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatedUserDto: UpdatedUserDto) {
    return this.userService.update(id, updatedUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
