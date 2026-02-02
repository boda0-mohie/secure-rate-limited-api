import { Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { Task } from "./entities/task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly usersService: UsersService
    ) { }

    /**
     * Create a new task for the authenticated user.
     * @param createTaskDto - The data for creating the task.
     * @param userId - The ID of the user creating the task.
     * @returns The created task.
     */
    public async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const user = await this.usersService.getCurrentUser(userId);
        const task = this.taskRepository.create({ ...createTaskDto, user });
        return this.taskRepository.save(task);
    }

    /**
     * Find all tasks for the authenticated user.
     * @param userId - The ID of the user.
     * @returns An array of tasks belonging to the user.
     */
    public async findAllUserTasks(userId: string): Promise<Task[]> {
        const user = await this.usersService.getCurrentUser(userId);
        return this.taskRepository.find({ where: { user } });
    }

    /**
     * Find a single task by ID for the authenticated user.
     * @param id - The ID of the task to find.
     * @param userId - The ID of the user.
     * @returns The task if found.
     * @throws NotFoundException if the task is not found.
     */
    public async findOneUserTask(id: string, userId: string): Promise<Task> {
        const user = await this.usersService.getCurrentUser(userId);
        const task = await this.taskRepository.findOne({ where: {id} });
        if (!task) {
            throw new NotFoundException(`Task not found`);
        }
        return task;
    }

    /**
     * Update a task for the authenticated user.
     * @param id - The ID of the task to update.
     * @param updateTaskDto - The data for updating the task.
     * @param userId - The ID of the user updating the task.
     * @returns The updated task.
     * @throws NotFoundException if the task is not found.
     */
    public async updateUserTask(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
        const {title, description, status} = updateTaskDto;
        const user = await this.usersService.getCurrentUser(userId);
        const task = await this.findOneUserTask(id, user.id);
        if (!task) {
            throw new NotFoundException(`Task not found`);
        }
        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (status) {
            task.status = status;
        }
        return this.taskRepository.save(task);
    }

    /**
     * Remove a task for the authenticated user.
     * @param id - The ID of the task to remove.
     * @param userId - The ID of the user removing the task.
     * @returns A message indicating successful deletion.
     * @throws NotFoundException if the task is not found.
     */
    public async removeUserTask(id: string, userId: string): Promise<{message: string}> {
        const user = await this.usersService.getCurrentUser(userId);
        const task = await this.findOneUserTask(id, user.id);
        await this.taskRepository.remove(task);
        return {
            message: "Task deleted successfully"
        }
    }
}