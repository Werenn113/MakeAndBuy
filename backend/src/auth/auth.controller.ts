import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    console.log(req.user);
    // return req.user;
  }
}
