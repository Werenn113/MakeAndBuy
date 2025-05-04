import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { resolve } from 'path';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupLocal(authDto: AuthDto, req: Request) {
    const hash = await this.hashData(authDto.password);

    const newUser = await this.prisma.users.create({
      data: {
        email: authDto.email,
        username: authDto.username,
        hash: hash,
      },
    });

    const { hash: _, ...userWithoutHash } = newUser;

    // Création de la session
    return new Promise((resolve, reject) => {
      req.login(userWithoutHash, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(userWithoutHash);
      });
    });
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error('User not found');

    const passwordMatches = await bcrypt.compare(password, user.hash);
    if (!passwordMatches) throw new Error('Invalid credentials');

    return {
      id: user.id,
    };
  }
}
