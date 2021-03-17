import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  async getTask(@Res() res: Response, @Param('id') id: string) {
    try {
      const task = await this.tasksService.getTask(id);
      // console.log(task);
      return res.status(HttpStatus.OK).json({
        message: 'Task Find',
        data: task,
      });
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Get()
  async getTasks(@Res() res: Response) {
    const tasks = await this.tasksService.getTasks();
    return res.status(HttpStatus.OK).json({
      message: 'List of Tasks',
      data: tasks,
    });
  }

  @Post('create')
  async createTask(@Res() res: Response, @Body() createTaskDTO: CreateTaskDTO) {
    const task = await this.tasksService.createTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task Successfully created',
      data: task,
    });
  }

  @Put(':id')
  async updateTask(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTaskDTO: CreateTaskDTO,
  ) {
    const task = await this.tasksService.updateTask(id, updateTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task Successfully updted',
      data: task,
    });
  }

  @Delete(':id')
  async deleteTask(@Res() res: Response, @Param('id') id: string) {
    const task = await this.tasksService.deleteTask(id);
    if (!task) throw new NotFoundException('Task does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Task Deleted',
      data: task,
    });
  }
}
