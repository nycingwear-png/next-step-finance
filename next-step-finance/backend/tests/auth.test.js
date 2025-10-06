const request = require('supertest');
const app = require('../server'); // Import app

describe('Auth', () => {
  it('should register user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ phone: '+123' });
    expect(res.statusCode).toEqual(201);
  });
});