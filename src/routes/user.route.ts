import { Router } from "express";
import { createUser, deleteUser, getUsers, loginUser, updateUser } from "../cotrollers/user.controller";
import { requireAuth } from "../middlewares/requireAuth.middleware";
import validate from "../middlewares/validateRequest.middleware";
import { createUserSchema } from "../schemas/createUser.schema";
import { loginUserSchema } from "../schemas/loginUser.schema";

const router = Router();

router.post('/user', validate(createUserSchema), createUser);
router.post('/user/login', validate(loginUserSchema), loginUser);
router.get('/users', requireAuth, getUsers);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

export default router;