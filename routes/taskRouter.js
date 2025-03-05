import {Router} from 'express';

const router = Router();

import {getAllTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask} from '../controllers/taskController.js';
import { validateTaskInput,validateTaskIdParam} from '../middleware/validationMiddleware.js';

  router.route('/').get(getAllTasks).post(validateTaskInput, createTask);
  router.route('/:id').get(validateTaskIdParam,getTask).patch(validateTaskInput,updateTask).delete(validateTaskIdParam,deleteTask);

  export default router;