import * as dotenv from 'dotenv';
import { addProject, getProjectMembers, getProjects } from '../service/projectService';
dotenv.config();
import * as typeorm from 'typeorm';
import dbconfig from '../config/database';
import * as ProjectModel from '../model/ProjectModel';

const testProjects = [
  {
    id: 1,
    name: 'rd1'
  },
  {
    id: 14,
    name: 'rd2'
  }
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
})

describe('test add a project with success case', () => {
  test('add project with a successful case', async () => {
    jest.spyOn(ProjectModel, 'addProject').mockImplementation(() => Promise.resolve(null));
    const result = await addProject('study1', [1, 5]);
    expect(result.message).toBeTruthy();
  });
})

describe('test get projects', () => {
  test('get all projects', async () => {
    jest.spyOn(ProjectModel, 'getProjects').mockImplementation(() => Promise.resolve(testProjects));
    const result = await getProjects();
    expect(result.data).toBeTruthy();
  });
});

describe('test get project members', () => {
  test('get member with wrong project id', async () => {
    jest.spyOn(ProjectModel, 'getProjectMembers').mockImplementation(() => Promise.resolve([]));
    const result = await getProjectMembers('11');
    expect(result.success).toBeFalsy();
  });
});