const mysql2 = require('mysql2')
const env = require('dotenv')
env.config({path:'./env/.env'})

const pool = mysql2.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})


module.exports = pool
