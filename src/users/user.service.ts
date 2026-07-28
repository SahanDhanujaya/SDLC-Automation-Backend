import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create
  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  // Get All
  findAll() {
    return this.prisma.user.findMany();
  }

  // Get One
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // Update
  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  // Delete
  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
