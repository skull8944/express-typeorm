import * as bcrypt from 'bcrypt';
import * as UserModel from '../model/UserModel';
import { User } from '../entity/User';
import { signJWT } from '../middleware/passport';

export const addUser = async (user: Omit<User, 'id'>) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await UserModel.addUser(user);
    // const result = await getConnection('ea').getRepository(User).save(data);
    return {
      success: true,
      data: result,
      message: 'add user successfully'
    }
  } catch (err) {
    throw (err);
  }
}

export const getUser = async () => {
  try {
    const result = await UserModel.getUser();
    return {
      success: true,
      data: result,
      messae: 'get user successfully'
    }
    // await getConnection('ea').getRepository(User)
    //   .createQueryBuilder('user')
    //   .select(['user.id', 'user.email', 'user.name'])
    //   .getMany()
  } catch (err) {
    throw (err);
  }
}

export const getUserPhoto = async (id: string) => {
  try {
    // const result = await getConnection('ea').getRepository(User).find({
    //   relations: ['photos'],
    //   where: { id }
    // })

    // return result[0].photos;
    const result = await UserModel.getUserPhoto(id);

    return {
      success: true,
      data: result,
      message: ''
    }
  } catch (err) {
    throw (err);
  }
}

export const login = async (email: string, password: string) => {
  try {
    // const user = await getConnection('ea').getRepository(User).findOne({ email: data.email });
    const user = await UserModel.getUserByEmail(email)

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return {
      success: false,
      data: null,
      message: 'wrong password'
    }
    const token = signJWT(email, user[0].name);

    return {
      success: true,
      data: token,
      message: 'login success'
    }
  } catch (err) {
    throw (err);
  }
}