import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';


const resolveFilePath = (folderName: string): string => {
  return process.env.NODE_ENV === 'production' ? `out/src/${folderName}/*.js` : `src/${folderName}/*.ts`;
  // return `src/${folderName}/*.ts`;
};

const dbconfig: ConnectionOptions = ({
  name: 'ea',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrationsRun: false,
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  maxQueryExecutionTime: 5000,
  entities: [resolveFilePath('entity')],
  migrations: [resolveFilePath('migration')],
  subscribers: [],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
});

export default dbconfig;