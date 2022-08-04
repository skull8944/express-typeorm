import { Profile } from 'src/entity/Profile';
import { getConnection } from 'typeorm';

export const getProfile = async (uid: string): Promise<Omit<Profile, 'uid'>[]> => {
  const connection = getConnection('ea');
  const sql = `
    select height, weight
    from profile
    where uid = ${uid}
  `;
  const result = await connection.query(sql);
  return result;
}

export const addProfile = async (profile: Profile) => {
  const connection = getConnection('ea');
  const sql = `
    insert into profile
    values(${profile.height}, ${profile.weight}, ${profile.uid})
  `;
  const result = await connection.query(sql);
  return result;
}

export const editProfile = async (profile: Profile) => {
  const connection = getConnection('ea');
  const sql = `
    update profile
    set height = ${profile.height}, weight = ${profile.weight}
    where uid = ${profile.uid}
  `;
  const result = await connection.query(sql);
  return result;
}