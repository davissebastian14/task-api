const { test, expect }= require('@playwright/test');

test('should register a new user', async ({request})=>{
    const email= `test${Date.now()}@example.com`;
    const response= await request.post('/auth/register',{
        data: {
            name: 'Test User',
            email: email,
            password: 'password123'
        }
    });
    expect(response.ok()).toBeTruthy();
})

test('should raise error on invalid email register', async({request})=>{
    const response= await request.post('/auth/register',{
        data: {
            name: 'Invalid User',
            email: 'testexample.com',
            password: '123456'
        }
    });
    expect(response.status()).toBe(400);
})

test('should login an existing user', async ({request})=>{
    const response= await request.post('auth/login',{
        data: {
            email: 'davis@gmail.com',
            password: '5349043'
        }
    });
    const body= await response.json();
    expect(body.token).toBeDefined();
})

test('should raise error on wrong password login', async({request})=>{
    const response= await request.post('auth/login',{
        data: {
            email: 'davis@gmail.com',
            password: 'wrongpass123'
        }
    })
    expect(response.status()).toBe(401);
})