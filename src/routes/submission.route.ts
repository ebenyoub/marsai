import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import SubmissionController from '../controllers/submission.controller.js';

const UPLOAD_DIR = path.resolve('uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'));
  },
});

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  SubmissionController.createSubmission,
);

export default router;
