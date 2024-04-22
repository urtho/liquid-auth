import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * Debugging Route that shows all Users
   */
  @Get('/all')
  async all() {
    try {
      return await this.authService.all();
    } catch (e) {
      throw new InternalServerErrorException({
        error: e.message,
      });
    }
  }

  /**
   * Display user keys
   *
   * @param session
   */
  @Get('/keys')
  @UseGuards(AuthGuard)
  async keys(@Session() session: Record<string, any>) {
    const wallet = session.wallet;
    try {
      const user = await this.authService.find(wallet);
      return user || {};
    } catch (e) {
      throw new InternalServerErrorException({
        error: e.message,
      });
    }
  }
  /**
   * Delete Credential
   *
   * @param session - Express Session
   * @param req - Express Request
   */
  @Delete('/keys/:id')
  @UseGuards(AuthGuard)
  async remove(
    @Session() session: Record<string, any>,
    @Req() req: Request,
  ) {
    try {
      const user = await this.authService.find(session.wallet);

      if (!user) {
        throw new NotFoundException({
          error: 'User not found',
        });
      }

      await this.authService.removeCredential(user, req.params.id);

      return { success: true };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException({
        error: e.message,
      });
    }
  }

  @Get('/logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    delete session.wallet;
    delete session.active;
    delete session.requestId;
    res.redirect(302, '/');
  }
  /**
   * Read Session
   *
   * @param session
   */
  @Get('/session')
  async read(@Session() session: Record<string, any>) {
    const user = await this.authService.find(session.wallet);
    return (
      {
        user: user
          ? {
              id: user.id,
              wallet: user.wallet,
              credentials: user.credentials,
            }
          : null,
        session,
      } || {}
    );
  }
}
