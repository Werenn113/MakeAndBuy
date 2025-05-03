import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = new Redis(redisUrl, {});
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 86400 * 30, //1 jour
  });

  app.set('trust proxy', 1);
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || '123',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        sameSite: 'lax',
        secure: false,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
