import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import employeeRoutes from './api/v1/routes/employee.routes';
import branchRoutes from './api/v1/routes/branch.routes';

const app: Application = express();
const port = 3000; // Define port (use 3001 if 3000 is in use)

app.use(morgan('combined')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is healthy');
});

// Mount routes
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/branches', branchRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;