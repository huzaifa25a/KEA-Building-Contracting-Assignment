const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/add_projects', async (req, res) => {
    const {project_name, client_name, estimated_budget} = req.body;
    try{
        console.log('inside hereeee');
        const query = await pool.query(
            `insert into projects (project_name, client_name, estimated_budget) values ($1, $2, $3)`,
            [project_name, client_name, estimated_budget]
        )
        console.log(query);
        if(query){
            res.status(201).json({
                message: 'project created',
                response: query.rows
            });
        }
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

router.get('/get_projects', async (req, res) => {
    try{
        const response = await pool.query("SELECT * FROM projects")
        res.status(200).json(response.rows);
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

router.get('/get_budget', async(req, res) => {
    try{
        const query = await pool.query(
            `select 
                p.estimated_budget,
                coalesce(sum(e.amount), 0) as total_expenses,
                p.estimated_budget - coalesce(sum(e.amount), 0) as remaining_budget
            from projects p
                left join expenses e on p.project_id = e.project_id
            group by p.project_id;`
        )
        console.log(query);
        res.status(200).json({
            message: 'found here',
            query: query.rows
        })
    }
    catch(err){
        res.status(400).json({message: err});
    }
})

module.exports = router;