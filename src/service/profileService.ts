import * as ProfileModel from '../model/ProfileModel';
import { Profile } from '../entity/Profile';

export const getProfile = async (uid: string) => {
  try {
    // const employeeRepos = getConnection('ea').getRepository(Employee);
    // const result = await employeeRepos
    //   .find({
    //     relations: ['profile'],
    //     where: { id: eid }
    //   })
    const result = await ProfileModel.getProfile(uid)

    return {
      success: true,
      data: result[0],
      messagge: ''
    }
  } catch (err) {
    throw (err);
  }
}

export const addProfile = async (profile: Profile) => {
  try {
    const result = await ProfileModel.addProfile(profile);
    return {
      success: true,
      data: result,
      message: 'profile added successfully'
    }
    // await getConnection('ea')
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Profile)
    //   .values(profile)
    //   .execute();
  } catch (err) {
    throw (err);
  }
}

export const editProfile = async (profile: Profile) => {
  try {
    const result = await ProfileModel.editProfile(profile);
    return {
      success: true,
      data: result,
      message: 'profile edited successfully'
    }
    // const profileRepos = getConnection('ea').getRepository(Profile);
    // return await profileRepos
    //   .createQueryBuilder()
    //   .update(Profile)
    //   .set({
    //     height: profile.height,
    //     weight: profile.weight
    //   })
    //   .where('uid = :uid', { uid: profile.uid })
    //   .execute();
  } catch (err) {
    throw (err);
  }
}
