import request from 'supertest';
import app from '../src/app';
import { employees } from '../src/data/employees'; 

describe('Employee Routes', () => {
  describe('POST /api/v1/employees', () => {
    it('should create a new employee successfully', async () => {
      // Arrange
      const newEmployee = {
        name: 'Test Employee',
        position: 'Test Position',
        department: 'Test Dept',
        email: 'test@example.com',
        phone: '123-456-7890',
        branchId: 1,
      };
      // Act
      const response = await request(app).post('/api/v1/employees').send(newEmployee);
      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newEmployee.name);
    });

    it('should return 400 if missing required parameters', async () => {
      // Arrange
      const invalidEmployee = { name: 'Test' }; // Missing fields
      // Act
      const response = await request(app).post('/api/v1/employees').send(invalidEmployee);
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required parameters');
    });
  });

  describe('GET /api/v1/employees', () => {
    it('should return all employees successfully', async () => {
      // Arrange
      // Act
      const response = await request(app).get('/api/v1/employees');
      // Assert
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return employees with correct properties', async () => {
      // Arrange
      // Act
      const response = await request(app).get('/api/v1/employees');
      // Assert
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('position');
      expect(response.body[0]).toHaveProperty('department');
      expect(response.body[0]).toHaveProperty('email');
      expect(response.body[0]).toHaveProperty('phone');
      expect(response.body[0]).toHaveProperty('branchId');
    });
  });

  describe('GET /api/v1/employees/:id', () => {
    it('should return employee by ID successfully', async () => {
      // Arrange
      const id = 1; // Assuming sample data has ID 1
      // Act
      const response = await request(app).get(`/api/v1/employees/${id}`);
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(id);
    });

    it('should return 400 if missing or invalid ID', async () => {
      // Arrange
      // Act
      const response = await request(app).get('/api/v1/employees/invalid');
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing or invalid ID');
    });
  });

  
});