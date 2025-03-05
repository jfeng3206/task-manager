import {Router} from 'express';

const router = Router();

import { getUsers, getCurrentUser, getApplicationStats } from '../controllers/userController.js';
import { validateUserIdParam,} from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
router.route('/').get(getUsers);
router.get('/current-user',getCurrentUser);
router.get('/admin/app-stats',[authorizePermissions('admin'),getApplicationStats]);
// router.route('/update-user').patch(validateUserIdParam, updateUser);

export default router;