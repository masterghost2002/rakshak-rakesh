import express from 'express';
import GETASSESSEMENT from '../controllers/assessement/route';
const router = express.Router();
router.get('/new-assessment', GETASSESSEMENT);
export default router;