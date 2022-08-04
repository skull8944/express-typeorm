import { getConnection } from 'typeorm';

export const addPhoto = async (url: string, uid: string) => {
  const connection = getConnection('ea');
  const sql = `
    insert into photo (url, user_id)
    values ('${url}', '${uid}')
  `
  const result = await connection.query(sql);
  return result;
}

export const getUserPhoto = async (id: string) => {
  const connection = getConnection('ea');
  const sql = `
    select *
    from "user" u left join photo p on u.id = p.user_id
    where u.id = ${id}
  `
  const result = await connection.query(sql);
  return result;
}

export const getPhotoOwner = async (id: string) => {
  const connection = getConnection('ea');
  const sql = `
    select user_id, name, email
    from photo p left join "user" u on p.user_id = u.id
    where p.id = ${id}
  `
  const result = await connection.query(sql);
  return result;
}