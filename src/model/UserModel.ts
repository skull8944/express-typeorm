import { User } from 'src/entity/User';
import { getConnection } from 'typeorm';

export const addUser = async (user: Omit<User, 'id'>) => {
  const connection = getConnection('ea');
  let sql = ``;
  if(user.manager == undefined) sql = `
      insert into "user" (name, email, password)
      values ('${user.name}','${user.email}','${user.password}')
    `
   else sql =  `
   insert into "user" (name, email, password, manager_id)
   values ('${user.name}','${user.email}','${user.password}', ${user.manager})
 `
  const result = await connection.query(sql)
  return result;
}

// user關鍵字雙引號
export const getUser = async (): Promise<Omit<User, 'password'>[]> => {
  const connection = getConnection('ea');
  const sql = `
    select id, email, name
    from "user"
  `
  const result = await connection.query(sql) as Promise<Omit<User, 'password'>[]>
  return result;
}

export const getUserPhoto = async (data: any): Promise<string[]> => {
  const connection = getConnection('ea');
  const sql = `
    select url
    from "user" left join "photo"  on "user".id = "photo".user_id
    where user_id = ${data}
  `

  const result = await connection.query(sql) as Promise<string[]>
  return result;
}

export const getUserByEmail = async (email: string): Promise<Omit<User, 'id'>[]> => {
  const connection = getConnection('ea');
  const sql = `
    select email, name, password
    from "user"
    where email = '${email}'
  `
  const result = await connection.query(sql) as Promise<Omit<User, 'id'>[]>
  return result;
}