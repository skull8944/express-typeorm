import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Request } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) token = req.cookies.jwt
  return token;
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      // ExtractJwt.fromAuthHeaderAsBearerToken(),
      // dotenv.config() put before import passport
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await getConnection('ea').getRepository(User)
        .findOne({ email: payload.email });
      const returnUser = {
        email: user.email,
        name: user.name
      }
      done(null, returnUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  await getConnection('ea').getRepository(User).findOne(user);
  done(null, user);
});

export const signJWT = (email: string, name: string) => {
  const key = process.env.JWT_SECRET;
  return jwt.sign({ email, name }, key);
}

export default passport;