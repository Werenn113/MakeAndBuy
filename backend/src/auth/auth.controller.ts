import {
  Controller,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Delete,
} from '@nestjs/common';
import { request, Request } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() authDto: AuthDto, @Req() req: Request) {
    return await this.authService.signupLocal(authDto, req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Req() req: Request) {
    return await req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout(req);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete')
  async deleteUser(@Req() req: Request) {
    return await this.authService.deleteUser(req);
  }
}
