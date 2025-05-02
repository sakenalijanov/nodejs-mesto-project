import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/user';

const router = Router();

router.get('/:userId', getUser);
router.post('/', createUser);
router.get('/', getUsers);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);
export default router;
