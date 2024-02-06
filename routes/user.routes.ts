import express from 'express';
import CREATEUSER from '../controllers/user/sign-up/route';
import notUserExist from '../middlewares/not-user-exist';
const router = express.Router();
router.post('/sign-up',notUserExist, CREATEUSER);
export default router;
