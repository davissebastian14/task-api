const {test, expect}= require('@playwright/test')

let token;

test.beforeAll(async ({request})=>{
    const response = await request.post('/auth/login',{
        data:{
            email: "davis@gmail.com",
            password: '5349043'
        }
    });
    const body= await response.json();
    token= body.token;
});

test('should get tasks of user with valid token', async ({request})=>{
    const response= await request.get('/tasks',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    expect(response.ok()).toBeTruthy();
});

test('should create task with valid token', async({request})=>{
    const response= await request.post('/tasks',{
        data:{
            title: 'Test task create'
        },
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    expect(response.status()).toBe(201);
})

