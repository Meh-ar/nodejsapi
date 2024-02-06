const { Sequelize, DataTypes } = require('sequelize');


const sequelize = require('../database/sequelize-connect-database');



const User = sequelize.define('Users', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},);
module.exports = User;