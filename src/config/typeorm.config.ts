import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    synchronize: true,
    // entities: [__dirname + '/entities/*.ts'],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [__dirname + '../**/*.entity{.ts,.js}'],
    // entities: ['dist/*.js'],
    // entities: ["dist/**/**/*.entity{.ts,.js}"],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/../**/*.entity.js'],
    // entities: ['dist/**/*.entity{.ts,.js}'],
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    // entities: [Task],
    autoLoadEntities: false,

}
