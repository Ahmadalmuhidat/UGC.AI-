import express from 'express';
import {
  createProject,
  generateVideo,
  getAllProjects,
  getProjectById,
  deleteProject
} from '../controllers/project.js';
import { authenticate } from '../middlewares/auth.js';
import upload from '../configs/storage.js';

const router = express.Router();

router.get('/', authenticate, getAllProjects);
router.get('/:id', authenticate, getProjectById);
router.post('/', authenticate, upload.array('images', 2), createProject);
router.post('/video', authenticate, generateVideo);
router.delete('/:id', authenticate, deleteProject);



export default router;