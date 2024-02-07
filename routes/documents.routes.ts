import UPLOADDOCUMENT from '../controllers/documents/upload/route';
import express from 'express';
import multerupload from '../util/multer';
import validateToken from '../middlewares/validate-session-token';
const router = express.Router();
router.post('/upload',validateToken, multerupload.single('file'), UPLOADDOCUMENT);
export default router;
