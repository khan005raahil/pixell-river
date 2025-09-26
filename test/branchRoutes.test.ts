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

  