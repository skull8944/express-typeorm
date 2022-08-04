import * as dotenv from 'dotenv';
dotenv.config();
import { addPhoto, getPhotoOwner, getUserPhoto } from '../service/photoService';
import * as PhotoModel from '../model/PhotoModel';
import * as typeorm from 'typeorm';
import dbconfig from '../config/database';

const addPhotoResult = []

const getPhotoResult = [
  { 'url': '1.jpg' },
  { 'url': '2.jpg' },
  { 'url': '3.jpg' },
  { 'url': '4.jpg' }
]

const setupConnector = async () => {
  // jest.spyOn(typeorm, 'getConnection').mockImplementation(() => {
  //   return {
  //     transaction: async (func): Promise<void> => {
  //       return func();
  //     },
  //   } as typeorm.Connection;
  // });
  await typeorm.createConnection(dbconfig);;
};

beforeAll(async () => {
  await setupConnector()
})

describe('test add user photo', () => {
  test('add photo with a success code', async () => {
    const testBody = {
      url: 'cat.jpg',
      uid: '1'
    }
    jest.spyOn(PhotoModel, 'addPhoto').mockImplementation(() => Promise.resolve(addPhotoResult));
    const result = await addPhoto(testBody.url, testBody.uid);
    expect(result.success).toBeTruthy();
  })
});

describe('test get user photo', () => {
  test('get user photo with success case', async () => {
    jest.spyOn(PhotoModel, 'getUserPhoto').mockImplementation(() => Promise.resolve(getPhotoResult));
    const result = await getUserPhoto('1');
    expect(result.success).toBeTruthy();
  })
})

describe('test get photo owner', () => {
  test('get user photo with fail case', async () => {
    jest.spyOn(PhotoModel, 'getPhotoOwner').mockImplementation(() => Promise.resolve(null));
    const result = await getPhotoOwner('14');
    expect(result.success).toBeFalsy();
  })
})