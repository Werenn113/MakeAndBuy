import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CookieSerializer } from './cookie-serializer';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      property: 'user',
      session: true,
    }),
  ],
  providers: [LocalStrategy, LocalAuthGuard, CookieSerializer],
  controllers: [],
})
export class AuthModule {}
