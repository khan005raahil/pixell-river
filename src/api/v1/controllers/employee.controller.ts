import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service';

export const createEmployee = (req: Request, res: Response): void => {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }
  const newEmployee = employeeService.createEmployee({ name, position, department, email, phone, branchId });
  res.status(201).json(newEmployee);
};

export const getAllEmployees = (_req: Request, res: Response): void => {
  const employees = employeeService.getAllEmployees();
  res.status(200).json(employees);
};

export const getEmployeeById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const employee = employeeService.getEmployeeById(id);
  if (!employee) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }
  res.status(200).json(employee);
};

export const updateEmployee = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).json({ error: 'No update data provided' });
    return;
  }
  const updatedEmployee = employeeService.updateEmployee(id, data);
  if (!updatedEmployee) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }
  res.status(200).json(updatedEmployee);
};

export const deleteEmployee = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }
  res.status(204).send();
};

export const getEmployeesByBranch = (req: Request, res: Response): void => {
  const branchId = parseInt(req.params.branchId, 10);
  if (isNaN(branchId)) {
    res.status(400).json({ error: 'Missing or invalid branch ID' });
    return;
  }
  const employees = employeeService.getEmployeesByBranch(branchId);
  res.status(200).json(employees);
};

export const getEmployeesByDepartment = (req: Request, res: Response): void => {
  const department = req.params.department;
  if (!department || department.trim() === '') {
    res.status(400).json({ error: 'Missing department' });
    return;
  }
  const employees = employeeService.getEmployeesByDepartment(department);
  res.status(200).json(employees);
};