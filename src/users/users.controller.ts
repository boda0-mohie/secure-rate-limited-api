import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import * as type from 'utils/type';
import { AuthGuard } from './guards/auth.guard';
import { AuthRolesGuard } from './guards/auth-role.guard';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    // POST: ~/api/users/auth/register
    @Post('auth/register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    // POST: ~/api/users/auth/login
    @Post('auth/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // GET: ~/api/users/me
    @Get('me')
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: type.JWTPayloadType) {
        return this.usersService.getCurrentUser(user.sub);
    }
}
