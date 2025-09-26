import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('should return 200 OK with health message', async () => {
    // Arrange
    // Act
    const response = await request(app).get('/health');
    // Assert
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is healthy');
  });
});