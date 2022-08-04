import * as dotenv from 'dotenv';
dotenv.config();
import dbconfig from '../config/database';
import * as typeorm from 'typeorm';
import * as UserModel from '../model/UserModel';
import { addUser, getUser, login } from '../service/userService';
import { User } from '../entity/User';

const badFormatedUser: User = {
  id: 146,
  name: 'bad formatted',
  email: '146',
  password: '213124'
}

const testLoginUser: Omit<User, 'id'>[] = [
  {
    name: 'yuzhi',
    email: '1@1.com',
    password: '21jjgjsdnghsaspofja'
  }
]

const testUsers: Omit<User, 'password'>[] = [
  {
    id: 1,
    name: 'yuzhi',
    email: '1@1.com'
  },
  {
    id: 2,
    name: 'shawn',
    email: '2@2.com'
  },
]

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

beforeAll(async () => {
  await setupConnector();
});

describe('test register user', () => {
  test('register a badly formatted user', async () => {
    jest.spyOn(UserModel, 'addUser').mockImplementation(() => Promise.resolve(null));
    const result = await addUser(badFormatedUser);
    expect(result.success).toBeFalsy();
  });
});

describe('test get all users', () => {
  test('get all users', async () => {
    jest.spyOn(UserModel, 'getUser').mockImplementation(() => Promise.resolve(testUsers));
    const result = await getUser();
    expect(result.success).toBeTruthy();
  });
});

describe('test login user', () => {
  test('login user with a succes case', async () => {
    jest.spyOn(UserModel, 'getUserByEmail').mockImplementation(() => Promise.resolve(testLoginUser));
    const result = await login('1@1.com', '123456');
    expect(result.success).toBeTruthy();
  });
});