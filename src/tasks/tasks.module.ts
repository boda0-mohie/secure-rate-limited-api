import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TasksController } from './tasks.controller';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Task]),
        forwardRef(() => UsersModule),
        JwtModule
    ],
    providers: [TasksService],
    controllers: [TasksController],
    exports: [TasksService],
})
export class TasksModule { }