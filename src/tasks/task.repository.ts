import { Task } from './task.entity';
import { Entity, EntityRepository, Repository } from 'typeorm';

@Entity()
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}