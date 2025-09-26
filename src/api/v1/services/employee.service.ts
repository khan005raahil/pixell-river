import { Employee, employees } from '../../../data/employees';

export const getAllEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};

export const createEmployee = (data: Omit<Employee, 'id'>): Employee => {
  const newId = Math.max(...employees.map(emp => emp.id), 0) + 1;
  const newEmployee: Employee = { id: newId, ...data };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id: number, data: Partial<Omit<Employee, 'id'>>): Employee | undefined => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return undefined;
  employees[index] = { ...employees[index], ...data };
  return employees[index];
};

export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};

export const getEmployeesByBranch = (branchId: number): Employee[] => {
  return employees.filter(emp => emp.branchId === branchId);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp => emp.department === department);
};