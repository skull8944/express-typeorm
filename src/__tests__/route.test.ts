import * as dotenv from 'dotenv';
import { initServer } from 'src';
dotenv.config();
import * as request from 'supertest';
import * as typeorm from 'typeorm';
import dbconfig from '../config/database';

const setupConnector = async () => {
  // jest.spyOn(typeorm, 'getConnection').mockImplementation(() => {
  //   return {
  //     transaction: async (func): Promise<void> => {
  //       return func();
  //     },
  //   } as typeorm.Connection;
  // });
  await typeorm.createConnection(dbconfig);
};

let server = null;
beforeAll(async () => {
  server = await initServer();
  await setupConnector();
});

describe('test get not found page', () => {
  test('get with not existed url', async () => {
    const result = await request(server).get('http:/localhost:4000/api/404');
    expect(result.statusCode).toBe(404);
  })
});