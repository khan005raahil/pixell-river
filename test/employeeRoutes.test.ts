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

  
});