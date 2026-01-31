import express from 'express';
import cors from 'cors';
import env from './utils/env.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerk.js';
import usersRoutes from './routes/user.js';
import projectsRoutes from './routes/project.js';

const app = express();

app.use(cors());
app.post('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(env.PORT, () => {
  console.log(`Server is running at ${env.PORT}`);
});