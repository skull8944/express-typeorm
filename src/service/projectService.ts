import * as ProjectModel from '../model/ProjectModel';

export const getUserProjects = async (id: string) => {
  try {
    const result = await ProjectModel.getUserProjects(id);

    return {
      success: true,
      data: result,
      message: ''
    }
    // const result = await getConnection('ea').getRepository(User)
    //   .find({
    //     relations: ['project'],
    //     where: { id }
    //   })

    // return result[0].project;
  } catch (err) {
    throw (err);
  }
}

export const getProjectMembers = async (pid: string) => {
  try {
    const result = await ProjectModel.getProjectMembers(pid);

    return {
      success: true,
      data: result,
      message: ''
    }
    // const result = await getConnection('ea').getRepository(Project)
    //   .find({
    //     relations: ['users'],
    //     where: { id: pid }
    //   })

    // return result[0].users;
  } catch (err) {
    throw (err);
  }
}

export const getProjects = async () => {
  try {
    const result = await ProjectModel.getProjects();
    return {
      success: true,
      data: result,
      message: ''
    }
    // return await getConnection('ea').getRepository(Project).find();
  } catch (err) {
    throw (err);
  }
}

export const addProject = async (name: string, member: number[]) => {
  try {
    const result = await ProjectModel.addProject(name, member);

    return {
      success: true,
      data: result,
      message: 'project added successfully'
    }
    // const users: User[] = member.map((m) => {
    //   return getConnection('ea')
    //     .getRepository(User)
    //     .create({
    //       id: m
    //     })
    //   })

    // const project = getConnection('ea')
    //   .getRepository(Project)
    //   .create({
    //     name,
    //     users
    //   })

    // await getConnection('ea')
    //   .getRepository(Project)
    //   .save(project)
  } catch (err) {
    throw (err);
  }
}
