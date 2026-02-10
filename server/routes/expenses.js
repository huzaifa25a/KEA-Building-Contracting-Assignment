const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/add_expense/:project_id', async (req, res) => {
    const {description, amount, category} = req.body;
    const {project_id} = req.params;
    if(!project_id || description.trim().length === 0 || amount < 0 || category.trim().length === 0){
        return res.status(400).json({message: "missing or invalid details"});
    }
    try{
        const query = await pool.query(
            `insert into expenses (project_id, description, amount, category) values ($1, $2, $3, $4)`,
            [project_id, description, amount, category]
        )
        res.status(201).json({
            message: 'expense created',
            query: query.rows
        })
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

router.get('/get_expenses/:project_id', async (req, res) => {
    const {project_id} = req.params;
    try{
        const query = await pool.query(
            `select * from expenses where project_id = $1`, 
            [project_id]
        )
        if(query){
            res.status(200).json({
                message: 'found here',
                query: query.rows
            })
        }
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

router.put('/update_expense/:expense_id', async (req, res) => {
    const {description, amount, category} = req.body;
    const {expense_id} = req.params;
    if(description.trim().length === 0 || amount < 0 || category.trim().length === 0){
        return res.status(400).json({message: "missing or invalid details"});
    }
    try{
        const query = await pool.query(
            `update expenses set description = $1, amount = $2, category = $3 where expense_id = $4`,
            [description, amount, category, expense_id]
        )
        if (query.rowCount === 0) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(201).json({
            message: 'expense updated',
            query: query.rows
        })
    }
    catch(err){
        res.status(400).json({message: err});
    }   
})

router.delete('/delete_expense/:expense_id', async (req, res) => {
    const {expense_id} = req.params;
    try{
        const query = await pool.query(
            `delete from expenses where expense_id = $1`,
            [expense_id]
        )
        if(query.rowCount === 0){
            res.status(400).json({message: 'Expense does not exist'});
        }
        res.status(200).json({
            message: 'expense deleted'
        })
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

module.exports = router;