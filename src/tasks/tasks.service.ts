import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from './dto/createTask.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getTask(id: string): Promise<Task> {
    // if (!Types.ObjectId.isValid(id)) return null;
    const task = await this.taskModel.findById(id);
    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = new this.taskModel(createTaskDTO);
    return await newTask.save();
  }

  async updateTask(id: string, createTaskDTO: CreateTaskDTO): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      createTaskDTO,
      { new: true },
    );
    return updatedTask;
  }

  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    return deletedTask;
  }
}
