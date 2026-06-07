const express= require('express');
const pool= require('../db');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

const router= express.Router();

router.post('/register', async(req, res)=>{
    try{
        let name= req.body.name;
        let email= req.body.email;
        let password= req.body.password;
        let role= "user";
        const hash= await bcrypt.hash(password, 10);
        const registeredUser= await pool.query(`INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4) RETURNING name, role, email`, [name, role, email, hash]);

        res.json(registeredUser.rows[0]);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: 'Database error'});
    }
});

router.post('/login', async(req, res)=>{
    try{
        let email= req.body.email;
        let password= req.body.password;
        let result= await pool.query(`SELECT * FROM users WHERE email= $1`,[email]);
        let user= result.rows[0];
        if(user){
            let checkPassword= await bcrypt.compare(password, user.password);
            if(checkPassword){
                const token= jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                res.json(token);
            }
            else{
                return res.status(401).json({message: 'Invalid credentials'});
            }
        } else{
            return res.status(401).json({message: 'Invalid credentials'});
        }    
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: 'Database error'});
    }
});

module.exports= router;

