import express from 'express';
import GETASSESSEMENT from '../controllers/assessement/route';
import GENERATERESULT from '../controllers/assessement/generate-result/route';
import validateToken from '../middlewares/validate-session-token';
const router = express.Router();
router.get('/new-assessment',validateToken, GETASSESSEMENT);
router.post('/generate-result',validateToken, GENERATERESULT);
export default router;