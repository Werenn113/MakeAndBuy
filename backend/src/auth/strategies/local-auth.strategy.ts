import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

const users = [
  { id: 1, name: 'Werenn', password: '123', email: 'werenn@example.com' },
];

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
    });
  }

  async validate(request: Request, email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('titi');
    }
    return user;
  }
}
