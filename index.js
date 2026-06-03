const express = require('express');
const pool= require('./db');

const app = express();
app.use(express.json());

app.get('/users', async(req, res)=> {
    try{
        const result= await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database error'});
    }
});

app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const user= users.find(function(u) {
        return u.id === id;
    });
    if(!user) {
        return res.status(404).json({message: 'User not found' });
    }
    res.json(user);
});

app.post('/users', function(req, res){
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/users/:id', function(req, res){
   const id= parseInt(req.params.id);
   const index= users.findIndex(function(u){
        return u.id === id;
   });
   if(index === -1){
        return res.status(404).json({message: 'User not foound'});
   }
   const deletedUser = users.splice(index, 1)[0];
   res.json(deletedUser); 
})

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});