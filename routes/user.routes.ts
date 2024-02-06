import express from 'express';
import CREATEUSER from '../controllers/user/sign-up/route';
import SIGNIN from '../controllers/user/sign-in/route';
import notUserExist from '../middlewares/not-user-exist';
import isUserExist from '../middlewares/is-user-exist';
const router = express.Router();
router.post('/sign-up',notUserExist, CREATEUSER);
router.post('/sign-in',isUserExist, SIGNIN);
export default router;
