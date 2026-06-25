const pool= require("../db");
const authMiddleware= require("../middleware/auth");
const express= require("express");
const Joi= require("joi");
const validate= require("../middleware/validate");


const router= express.Router();

const taskSchema= Joi.object({
    title: Joi.string().required().min(3)
})

const statusSchema= Joi.object({
    status: Joi.string().valid('pending','in-progress','done').required()
})

router.get('/', authMiddleware, async(req,res,next)=>{
    try{
        let userId= req.user.id;
        const result= await pool.query("SELECT tasks.id, tasks.title, tasks.status, users.name AS owner FROM tasks JOIN users ON tasks.user_id= users.id WHERE tasks.user_id= $1",[userId]);
        res.json(result.rows);
    } catch(err){
        next(err);
    }
})

router.get('/:id', authMiddleware, async(req,res,next)=>{
    try{
        let id= parseInt(req.params.id);
        let userId= req.user.id;
        const result= await pool.query("SELECT id, title, status FROM tasks WHERE id=$1 AND user_id=$2", [id, userId]);
        if(result.rows.length == 0){
            return res.status(404).json({error: "Task not found"});
        }
        res.json(result.rows[0]);
    }
    catch(err){
        next(err);
    }
})

router.post('/', authMiddleware, validate(taskSchema), async(req,res,next)=>{
    try{
        let title= req.body.title;
        let userId= req.user.id;
        const newTask= await pool.query(`INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *`,[title, userId]);
        res.status(201).json(newTask.rows[0]);
    } catch(err){
        next(err);
    }
});

router.put('/:id', authMiddleware, validate(statusSchema), async(req,res,next)=>{
    try{
        const id= parseInt(req.params.id);
        let status= req.body.status;
        let userId= req.user.id;
        const updateStatus= await pool.query(`UPDATE tasks SET status = $1 WHERE id = $2 AND user_id= $3 RETURNING *`,[status, id, userId]);
        if(updateStatus.rows.length === 0){
            return res.status(404).json({error: 'Task not found'});
        }
        res.json(updateStatus.rows[0]);
    } catch(err){
        next(err);
    }
});

router.delete('/:id', authMiddleware, async(req,res,next)=>{
    try{
        const id= parseInt(req.params.id);
        let userId= req.user.id;
        const deleteTask= await pool.query(`DELETE FROM tasks WHERE id= $1 AND user_id= $2 RETURNING *`,[id, userId]);
        if(deleteTask.rows.length === 0){
            return res.status(404).json({error: 'Task not found'})
        }
        res.json(deleteTask.rows[0]);
    } catch(err){
        next(err);
    }
})

module.exports= router;