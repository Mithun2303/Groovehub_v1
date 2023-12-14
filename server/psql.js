const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"mithun2303",
    host:"localhost",
    port:5432,
    database:"groovehub"
});

module.exports = pool;