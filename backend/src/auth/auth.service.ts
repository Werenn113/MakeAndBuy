import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { UserType } from 'src/types/user.types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupLocal(authDto: AuthDto, req: Request) {
    const isEmailTaken = await this.prisma.users.findUnique({
      where: { email: authDto.email },
    });
    if (isEmailTaken) throw new ConflictException('Email is already taken');

    const isUsernameTaken = await this.prisma.users.findUnique({
      where: { username: authDto.username },
    });
    if (isUsernameTaken)
      throw new ConflictException('Username is already taken');

    const hash = await this.hashData(authDto.password);

    const newUser = await this.prisma.users.create({
      data: {
        email: authDto.email,
        username: authDto.username,
        hash: hash,
      },
    });

    return new Promise((resolve, reject) => {
      req.login({ id: newUser.id }, (err) => {
        if (err) {
          return reject(err);
        }
        resolve({ id: newUser.id });
      });
    });
  }

  async logout(req: Request, message = 'Logout successful') {
    return new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          return reject(err);
        }
        req.session.destroy((err) => {
          if (err) {
            return reject(err);
          }
          resolve({ message: message });
        });
      });
    });
  }

  async deleteUser(req: Request) {
    const user = req.user as UserType;
    console.log(user);
    if (!user.id) throw new UnauthorizedException();

    await this.prisma.users.deleteMany({
      where: {
        id: user.id,
      },
    });

    return this.logout(req, 'deleted user');
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
    if (!user) throw new NotFoundException('User not found');

    const passwordMatches = await bcrypt.compare(password, user.hash);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
    };
  }
}
