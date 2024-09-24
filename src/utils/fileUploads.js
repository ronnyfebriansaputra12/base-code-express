import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix the typo in the filename variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Export the multer upload middleware
export const upload = multer({ storage: storage });
