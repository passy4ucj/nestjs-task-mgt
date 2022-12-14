import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    // private tasks: Task[]= [];

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
        ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user)
    }
    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto

    //     let tasks = this.getAllTasks()

    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) || task.description.includes(search)
    //         )
    //     }

    //     return tasks;
    // }


    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } })

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

        return found;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`)
    //     }

    //     return found;

    // }

    async deleteTaskById(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id })

        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
        // console.log(result)
    }


    // deleteTaskById(id: string): void {
    //     // const task = this.tasks.find(task => task.id === id)
    //     const found = this.getTaskById(id);

    //     this.tasks = this.tasks.filter(task => task.id !== found.id)

    // }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)

    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status;
        await task.save()

        return task;
    }


}
