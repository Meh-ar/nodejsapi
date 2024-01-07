const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tehran', 'mehdi', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize