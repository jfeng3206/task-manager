import {Router} from 'express';

const router = Router();

import {getAllTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask} from '../controllers/taskController.js';


  router.route('/').get(getAllTasks).post(createTask);
  router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

  export default router;