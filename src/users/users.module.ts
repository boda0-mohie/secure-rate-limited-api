import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    LogsModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => LogsModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.getOrThrow<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN') as any }
        }
      }
    }),
  ],
  providers: [UsersService, AuthService, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule, JwtModule],
})
export class UsersModule { }
