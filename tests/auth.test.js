const { registerSchema, loginSchema }= require('../routes/auth');


test('should return error when registering with invalid email', () => {
    let invalidUser= {
        name: "test",
        email: "testgmail.com",
        password: "123456"
    }
    let {error}= registerSchema.validate(invalidUser);
    expect(error).toBeDefined();
})

test('should return no error when registering with valid data', () =>{
    let validUser ={
        name: "test",
        email: "test@gmail.com",
        password: "123456"
    }
    let {error}= registerSchema.validate(validUser);
    expect(error).toBeUndefined();
})

test('should return error when logging in with missing password', () =>{
    let invalidUser={
        email: "test@gmail.com"
    }
    let {error}= loginSchema.validate(invalidUser);
    expect(error).toBeDefined();
})