import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import TaskController from "../../controllers/taskControllers/task.controllers.js";
import { validateSchema } from "../../middlewares/validator.middleware.js";
import { TaskSchema } from "../../schema/task/task.schema.js";

const router = Router();

router.get('/taskAll', auth, TaskController.getTaskAll);
router.get('/taskAllOneUser', auth, TaskController.taskAllOneUser);
router.get('/:id', auth, TaskController.taskOneById);
router.post('', auth, validateSchema(TaskSchema) ,TaskController.addTask);
router.put('/:id', auth, validateSchema(TaskSchema) ,TaskController.updateTask);
router.delete('/:id', auth, TaskController.deleteTask);


export default router;