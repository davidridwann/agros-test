const { Pool } = require('pg');
require('dotenv').config();

let pool = new Pool();

pool.connect((err) => {
    if (!!err) {
        console.log(err)
    } else {
        console.log('connected');
    }
})

module.exports = pool;