import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TasksController } from './tasks.controller';
import { LogsModule } from 'src/logs/logs.module';

@Module({
    imports: [
        UsersModule,
        LogsModule,
        TypeOrmModule.forFeature([Task]),
        forwardRef(() => UsersModule),
        forwardRef(() => LogsModule),
        JwtModule
    ],
    providers: [TasksService],
    controllers: [TasksController],
    exports: [TasksService],
})
export class TasksModule { }