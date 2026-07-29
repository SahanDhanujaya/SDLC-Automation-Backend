import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get All
  findAll() {
    return this.prisma.user.findMany();
  }

  // Get One
  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // Update
  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  // Delete
  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
