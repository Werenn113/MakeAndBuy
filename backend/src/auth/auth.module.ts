import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CookieSerializer } from './cookie-serializer';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      property: 'user',
      session: true,
    }),
  ],
  providers: [LocalStrategy, LocalAuthGuard, CookieSerializer, AuthService],
  controllers: [],
})
export class AuthModule {}
