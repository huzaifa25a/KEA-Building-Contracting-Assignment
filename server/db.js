const pkg = require('pg');
const {Pool} = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projects_tracker',
    password: 'hp25a5253',
    dialect: 'postgres',
    port: 5432
})

module.exports = pool;