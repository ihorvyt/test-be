const request = require('supertest');
const server = require('../server');

afterAll(() => {
    server.close();
});

describe('Express Prometheus metrics app', () => {
    it('should return Hello, World! at root route', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello, World!');
    });

    it('should return Prometheus metrics at /metrics', async () => {
        // First, make a request to increment the counter
        await request(server).get('/');

        const res = await request(server).get('/metrics');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/text\/plain/);
        expect(res.text).toMatch(/http_requests_total/);
    });
});
