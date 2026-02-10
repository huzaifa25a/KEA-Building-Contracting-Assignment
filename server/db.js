const pkg = require('pg');
const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  });
  

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'projects_tracker',
//     password: 'hp25a5253',
//     dialect: 'postgres',
//     port: 5432
// })

module.exports = pool;