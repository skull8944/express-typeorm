import * as PhotoModel from '../model/PhotoModel';

export const addPhoto = async (url: string, uid: string) => {
  try {
    const result = await PhotoModel.addPhoto(url, uid);
    return {
      success: true,
      data: result,
      message: 'add photo successfully'
    }
    // const photo = getConnection('ea').getRepository(Photo).create({
    //   ...payload,
    //   user: id
    // })
    // return await getConnection('ea').getRepository(Photo).save(photo);
  } catch (err) {
    throw (err);
  }
}

export const getUserPhoto = async (id: string) => {
  try {
    const result = await PhotoModel.getUserPhoto(id);
    return {
      success: true,
      data: result,
      messae: ''
    }
    // const photoRepos = getConnection('ea').getRepository(Photo);
    // return await photoRepos.find();
  } catch (err) {
    throw (err);
  }
}

export const getPhotoOwner = async (id: string) => {
  try {
    const result = await PhotoModel.getPhotoOwner(id);
    return {
      success: true,
      data: result[0],
      messae: ''
    }
    // const photoRepos = getConnection('ea').getRepository(Photo);
    // const result = await photoRepos.find({
    //   relations: ['user'],
    //   where: { id }
    // })
    // return result[0].user;
  } catch (err) {
    throw (err);
  }
}