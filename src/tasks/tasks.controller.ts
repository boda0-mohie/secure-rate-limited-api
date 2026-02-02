import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import * as type from 'utils/type';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // POST /api/tasks/create-task
    @Post('create-task')
    @UseGuards(AuthGuard)
    create(
        @CurrentUser() user: type.JWTPayloadType,
        @Body() createTaskDto: CreateTaskDto
    ) {
        return this.tasksService.create(createTaskDto, user.sub);
    }

    // GET /api/tasks/my-tasks
    @Get('my-tasks')
    @UseGuards(AuthGuard)
    findAll(
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.tasksService.findAllUserTasks(user.sub);
    }

    // GET /api/tasks/my-tasks/:id
    @Get('my-tasks/:id')
    @UseGuards(AuthGuard)
    findOne(
        @Param('id') id: string,
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.tasksService.findOneUserTask(id, user.sub);
    }

    // PATCH /api/tasks/update-task/:id
    @Patch('update-task/:id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @CurrentUser() user: type.JWTPayloadType,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        return this.tasksService.updateUserTask(id, updateTaskDto, user.sub);
    }

    // DELETE /api/tasks/delete-task/:id
    @Delete('delete-task/:id')
    @UseGuards(AuthGuard)
    remove(
        @Param('id') id: string,
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.tasksService.removeUserTask(id, user.sub);
    }
}