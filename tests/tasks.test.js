const {statusSchema} = require('../routes/tasks');

test('should return error for invalid status value updating', () =>{
    let invalidStatus={
        status: "fulfilled"
    }
    let {error}= statusSchema.validate(invalidStatus);
    expect(error).toBeDefined();
})