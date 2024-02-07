import UPLOADDOCUMENT from '../controllers/documents/upload/route';
import GETUSERDOCUMENTS from '../controllers/documents/user/route';
import DELEDOCUMENT from '../controllers/documents/remove/[publicId]/[_id]/route';
import express from 'express';
import multerupload from '../util/multer';
import validateToken from '../middlewares/validate-session-token';
const router = express.Router();
router.post('/upload',validateToken, multerupload.single('file'), UPLOADDOCUMENT);
router.get('/user',validateToken, GETUSERDOCUMENTS);
router.delete('/delete/:publicId/:_id',validateToken, DELEDOCUMENT);
export default router;
