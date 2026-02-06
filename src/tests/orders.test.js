const axios = require('axios');

const api = axios.create({ baseURL: 'http://localhost:3000' });

describe('Orders API', () => {
    const validOrder = {
        order_id: 'test123',
        customer_email: 'test@test.com',
        total_amount: 100,
        currency: 'EUR',
        created_at: '2026-02-04T17:29:11+00:00'
    };

    afterAll(async () => {
        await api.delete('/orders/test123');
    });

    test('GET /health - returns 200', async () => {
        const res = await api.get('/health');
        expect(res.status).toBe(200);
    });

    test('POST /orders - valid order returns 201', async () => {
        const res = await api.post('/orders', validOrder);
        expect(res.status).toBe(201);
    });

    test('POST /orders - same payload returns 200', async () => {
        const res = await api.post('/orders', validOrder);
        expect(res.status).toBe(200);
    });

    test('POST /orders - same order_id different payload returns 409', async () => {
        try {
            await api.post('/orders', {
                order_id: 'test123',
                customer_email: 'test@test.com',
                total_amount: 200,
                currency: 'EUR',
                created_at: '2026-02-04T17:29:11+00:00'
            });
        } catch (err) {
            expect(err.response.status).toBe(409);
        }
    });

    test('POST /orders - invalid email returns 400', async () => {
        try {
            await api.post('/orders', {
                order_id: 'test456',
                customer_email: 'invalid',
                total_amount: 100,
                currency: 'EUR',
                created_at: '2026-02-04T17:29:11+00:00'
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test('GET /orders/:id - existing returns 200', async () => {
        const res = await api.get('/orders/test123');
        expect(res.status).toBe(200);
    });

    test('GET /orders/nonexistent - returns 404', async () => {
        try {
            await api.get('/orders/nonexistent');
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });
});