const express = require('express');
const pool= require('../db');
const authMiddleware= require('../middleware/auth');

const router= express.Router();

router.get('/', authMiddleware, async(req, res, next)=> {
    try{
        const result= await pool.query('SELECT id,name,role FROM users');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', authMiddleware, async(req, res, next)=> {
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

router.delete('/:id', authMiddleware, async(req, res, next)=>{
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

module.exports= router;