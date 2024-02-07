import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Specify the storage destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Rename file to prevent conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Validate file types
const fileFilter = (req:any, file:Express.Multer.File, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported. Allowed types: image/jpeg, image/png, application/pdf.'));
    }
};

// Configure Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;