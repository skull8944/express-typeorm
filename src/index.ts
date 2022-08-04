import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import passport from './middleware/passport';
import dbconfig from './config/database';
import logger from './utils/logger';

import { connectLogger } from 'log4js';
import { AppRoutes } from './route';
import { createConnection } from 'typeorm';


export const initServer = async () => {
  logger.debug('server starting,,,');

  try {
    await createConnection(dbconfig);
    logger.debug('connect database success!');
  } catch (err) {
    logger.error('create database connection error, exit process.', err);
    process.exit();
  }

  const app = express();

  const whitelist = [
    'http://localhost:4000',
    'http://127.0.0.1:4000'
  ]

  app.use(
    cors({
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) > -1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true
    })
  );

  app.use(
    connectLogger(logger, {
      level: 'auto',
      format: (req, res, format) =>
        format(
          `:remote-addr :method[:status][:response-timems] :url ${req.is('multipart/form-data')
            ? 'form-data'
            : JSON.stringify(req.body)
          }`
        ),
      nolog: '/.(gif|jpe?g|png)$/'
    })
  );

  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(cookieParser());
  app.use(session({
    secret: 'session_secret',
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  AppRoutes.forEach((route) => {
    app[route.method](route.path, ...route.middlewares);
  });

  const PORT = process.env.PORT || 4000;

  http.createServer(app).listen(PORT, () => {
    logger.info(`Listening on ${PORT}`)
  })

}

initServer();