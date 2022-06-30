import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
// import { Department } from "../entities/Department.entity";
// import { Role } from "../entities/Role.entity";

export const pgDataSource = new DataSource({
  "type": "postgres",
    "host": "localhost",
    "port": 5433,
    "username": "postgres",
    "password": "123456",
    "database": "typeorm",
    "entities": [User], //__dirname + "../entities/*.entity.ts"
    "logging": true,
    "synchronize": false
})