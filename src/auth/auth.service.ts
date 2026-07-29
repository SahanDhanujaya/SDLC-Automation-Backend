/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { AuthProvider } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (existingUsername) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user
      .create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          username: dto.username,
          email: dto.email,
          password: hashedPassword,
          provider: AuthProvider.LOCAL,
        },
      })
      .then(async (user) => {
        return {
          status: 201,
          user: await this.prisma.user.findUnique({
            where: {
              id: user.id,
            },
          }),
          message: 'User created successfully',
        };
      });
  }
}
