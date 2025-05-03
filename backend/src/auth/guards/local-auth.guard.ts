import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.body);

    const canBeActivated = (await super.canActivate(context)) as boolean;

    await super.logIn(request);
    return canBeActivated;
  }

  handleRequest(err, user, info) {
    console.log({ user, err, info });
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException('toto');
    }
    return user;
  }
}
