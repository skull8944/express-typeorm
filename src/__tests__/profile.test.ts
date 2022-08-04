import * as dotenv from 'dotenv';
dotenv.config();
import { addProfile, editProfile, getProfile } from '../service/profileService';
import * as ProfileModel from '../model/ProfileModel';
import * as typeorm from 'typeorm';
import dbconfig from '../config/database';
import { Profile } from 'src/entity/Profile';

const addProfileResult = {
  success: true,
  data: [],
  message: 'add profile successfully'
}

const getProfileResult: Omit<Profile, 'uid'>[] = [
  {
    height: 167,
    weight: 55
  }
]

const testProfile = {
  uid: 14,
  height: 168,
  weight: 51
} as unknown as Profile

const failedTestProfile = {
  uid: 188,
  height: 168,
  weight: 51
} as unknown as Profile

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

describe('test add user Profile', () => {
  test('add Profile with a success code', async () => {
    jest.spyOn(ProfileModel, 'addProfile').mockImplementation(() => Promise.resolve(addProfileResult));
    const result = await addProfile(testProfile);
    expect(result.success).toBeTruthy();
  })
});

describe('test get user Profile', () => {
  test('get user Profile with success case', async () => {
    jest.spyOn(ProfileModel, 'getProfile').mockImplementation(() => Promise.resolve(getProfileResult));
    const result = await getProfile('1');
    expect(result.success).toBeTruthy();
  })
})

describe('test edit user profile', () => {
  test('edit a not existed user', async () => {
    jest.spyOn(ProfileModel, 'editProfile').mockImplementation(() => Promise.resolve(null));
    const result = await editProfile(failedTestProfile);
    expect(result.success).toBeFalsy();
  })
})