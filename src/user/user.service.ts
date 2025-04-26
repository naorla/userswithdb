import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService} from 'src/prisma-service/prisma-service.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    let users;
  
    if (role) {
      users = await this.prisma.user.findMany({ where: { role } });
    } 
    else {
      users = await this.prisma.user.findMany();
    }
  
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
  
    return users;
  }
  
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({where: { id: id }})

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDTO) {
    const user = await this.prisma.user.findUnique({where: {email: createUserDto.email } });
  
    if (user) {
      throw new ConflictException('Email already exists');
    }
  
    return this.prisma.user.create({ data: createUserDto });
  }
  

  async update(id: number, updatedUserDto: UpdatedUserDto) {
    await this.findOne(id); // will throw if not found

    return this.prisma.user.update({where: { id }, data: updatedUserDto});
  }

  async delete(id: number) {
    await this.findOne(id); // will throw if not found

    return this.prisma.user.delete({where: { id }});
  }
}
