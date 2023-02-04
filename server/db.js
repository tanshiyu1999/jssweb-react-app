// Configure where we want database
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "tanshiyu",
    password: "990912",
    database: "jssweb_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;