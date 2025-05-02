import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      property: 'user',
      session: true,
    }),
  ],
  providers: [LocalStrategy, LocalAuthGuard, SessionSerializer],
  controllers: [],
})
export class AuthModule {}
