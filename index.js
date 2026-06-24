const express = require('express');
const pool= require('./db');
const userRoutes= require('./routes/auth');
const taskRoutes= require('./routes/tasks');
const authMiddleware= require('./middleware/auth');
const errorHandle= require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/auth', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/users', authMiddleware, async(req, res, next)=> {
    try{
        const result= await pool.query('SELECT id,name,role FROM users');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.get('/users/:id', authMiddleware, async(req, res, next)=> {
    try{
         const id = parseInt(req.params.id);
         const result= await pool.query(`SELECT id,name,role FROM users where id = $1`,[id]);
         if(result.rows.length === 0){
            return res.status(404).json({error: 'User not found!'});
         }
         res.json(result.rows[0]);

    } catch(err){
        next(err);
    }
});

app.delete('/users/:id', authMiddleware, async(req, res, next)=>{
    try{
        const id= parseInt(req.params.id);
        const deletedUser= await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id,name,role`,[id]);
        if(deletedUser.rows.length === 0){
            return res.status(404).json({error: 'User not found'})
        }
        res.json(deletedUser.rows[0]);
    } catch (err){
        next(err);
    } 
})

app.use(errorHandle);

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});