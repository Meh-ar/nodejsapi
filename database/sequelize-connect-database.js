const { Sequelize } = require('sequelize');
require('dotenv').config()

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
});
module.exports = sequelize