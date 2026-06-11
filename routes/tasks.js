const pool= require("../db");
const authMiddleware= require("../middleware/auth");
const express= require("express");
const Joi= require("joi");
const validate= require("../middleware/validate");


const router= express.Router();

const taskSchema= Joi.object({
    title: Joi.string().required().min(3)
})

router.get('/', authMiddleware, async(req,res)=>{
    try{
        const result= await pool.query("SELECT tasks.id, tasks.title, tasks.status, users.name AS owner FROM tasks JOIN users ON tasks.user_id= users.id");
        res.json(result.rows);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: "Database error"});
    }
})

router.post('/', authMiddleware, validate(taskSchema), async(req,res)=>{
    try{
        let title= req.body.title;
        let userId= req.user.id;
        const newTask= await pool.query(`INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *`,[title, userId]);
        res.status(201).json(newTask.rows[0]);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: "Database error"});
    }
});

router.put('/:id', authMiddleware, async(req,res)=>{
    try{
        const id= parseInt(req.params.id);
        let status= req.body.status;
        const updateStatus= await pool.query(`UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`,[status, id]);
        if(updateStatus.rows.length === 0){
            return res.status(404).json({error: 'Task not found'});
        }
        res.json(updateStatus.rows[0]);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: "Database error"});
    }
});

router.delete('/:id', authMiddleware, async(req,res)=>{
    try{
        const id= parseInt(req.params.id);
        const deleteTask= await pool.query(`DELETE FROM tasks WHERE id= $1 RETURNING *`,[id]);
        if(deleteTask.rows.length === 0){
            return res.status(404).json({error: 'Task not found'})
        }
        res.json(deleteTask.rows[0]);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: "Database error"});
    }
})

module.exports= router;