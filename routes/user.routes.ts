import express from 'express';
import CREATEUSER from '../controllers/user/sign-up/route';
const router = express.Router();
router.post('/sign-up', CREATEUSER);
export default router;
