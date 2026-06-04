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

app.get('/users/:id', async(req, res)=> {
    try{
         const id = parseInt(req.params.id);
         const result= await pool.query(`SELECT * FROM users where id = $1`,[id]);
         if(result.rows.length === 0){
            return res.status(404).json({error: 'User not found!'});
         }
         res.json(result.rows[0]);

    } catch(err){
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
});

app.post('/users', async(req, res)=>{
    try{
        const name= req.body.name;
        const role= req.body.role;
        const newUser= await pool.query(`INSERT INTO users (name,role) VALUES ($1,$2) RETURNING *`,[name, role]);
        res.status(201).json(newUser.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Database error'});
    }
});

app.delete('/users/:id', async(req, res)=>{
    try{
        const id= parseInt(req.params.id);
        const deletedUser= await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`,[id]);
        if(deletedUser.rows.length === 0){
            return res.status(404).json({error: 'User not found'})
        }
        res.json(deletedUser.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Database error'})
    } 
})

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});