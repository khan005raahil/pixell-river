import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';

const router: Router = Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);

// Handling missing department parameter
router.get('/department', (_req, res) => {
    res.status(400).json({ error: 'Missing department' });
});

// Handling department with trailing slash but no parameter
router.get('/department/', (_req, res) => {
    res.status(400).json({ error: 'Missing department' });
});

// Handling department with parameter
router.get('/department/:department', employeeController.getEmployeesByDepartment);

// Handling branch routes
router.get('/branch/:branchId', employeeController.getEmployeesByBranch);


router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;