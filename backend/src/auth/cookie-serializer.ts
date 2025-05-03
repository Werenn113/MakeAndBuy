import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class CookieSerializer extends PassportSerializer {
  deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }
}
