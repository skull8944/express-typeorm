import { getConnection } from 'typeorm';

export const getUserProjects = async (id: string) => {
  const connection = getConnection('ea');
  const sql = `
    select id, name, email
    from "user" u left join "projectMember" pm on u.id = pm."user"
    where id = ${id}
  `
  const result = await connection.query(sql);
  return result;
}

export const getProjectMembers = async (pid: string) => {
  const connection = getConnection('ea');
  const sql = `
    select id, email, name
    from "projectMember" pm  left join "user" u  on pm."user"  = u.id
    where pid = ${pid}
  `
  const result = connection.query(sql);
  return result;
}

export const getProjects = async () => {
  const connection = getConnection('ea');
  const sql = `
    select * from project
  `
  const result = await connection.query(sql);
  return result;
}

export const addProject = async (name: string, member: number[]) => {
  const connection = getConnection('ea');
  connection.transaction(async (transaction) => {
    await transaction.query(`
      insert into project (name) values ('${name}')
    `);

    const pid = await transaction.query(`
      select id from project where name = '${name}'
    `);

    for (const user of member) {
      await transaction.query(`
        insert into "projectMember" values (${pid[0].id}, ${user})
      `);
    }
  })
}