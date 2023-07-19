require('dotenv').config()

const Sequelize = require('sequelize')
console.log(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, process.env.DBHOST)
module.exports = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})