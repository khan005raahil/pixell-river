import request from 'supertest';
import app from '../src/app';
import { branches } from '../src/data/branches'; 

describe('Branch Routes', () => {
  describe('POST /api/v1/branches', () => {
    it('should create a new branch successfully', async () => {
      // Arrange
      const newBranch = {
        name: 'Test Branch',
        address: 'Test Address',
        phone: '123-456-7890',
      };
      // Act
      const response = await request(app).post('/api/v1/branches').send(newBranch);
      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newBranch.name);
    });

    it('should return 400 if missing required parameters', async () => {
      // Arrange
      const invalidBranch = { name: 'Test' }; // Missing fields
      // Act
      const response = await request(app).post('/api/v1/branches').send(invalidBranch);
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required parameters');
    });
  });

  describe('GET /api/v1/branches', () => {
    it('should return all branches successfully', async () => {
      // Arrange
      // Act
      const response = await request(app).get('/api/v1/branches');
      // Assert
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/branches/:id', () => {
    it('should return branch by ID successfully', async () => {
      // Arrange
      const id = 1; // Assuming sample data has ID 1
      // Act
      const response = await request(app).get(`/api/v1/branches/${id}`);
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(id);
    });

    it('should return 400 if missing or invalid ID', async () => {
      // Arrange
      // Act
      const response = await request(app).get('/api/v1/branches/invalid');
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing or invalid ID');
    });
  });

  
});