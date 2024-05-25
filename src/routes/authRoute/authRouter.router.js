import {Router} from 'express'
import UserController from '../../controllers/authControllers/auth.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';
import { validateSchema } from '../../middlewares/validator.middleware.js';
import { AuthSchemaLogin, AuthSchemaRegister } from '../../schema/auth/task.schema.js';

const router = Router();

router.post('/register', validateSchema(AuthSchemaRegister) ,UserController.registerUser);
router.post('/login', validateSchema(AuthSchemaLogin) ,UserController.loginUser);
router.get("/logout", UserController.logoutUser);
router.get("/verify", UserController.verifyToken);
router.get("/profile", auth , UserController.profileUser)
export default router;
