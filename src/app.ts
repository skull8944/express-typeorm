import express from "express";
import router from "./routes/index.route";
import log from "./utils/log";
import { pgDataSource } from "./datasources/pgDataSoutce";

pgDataSource.initialize

const app = express();

pgDataSource.initialize()
  .then(() => log.info(`db connected`))
  .catch((err) => log.error(`[db]: ${err.message}`))

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  log.info(`server listen at http://localhost:3000`);
})