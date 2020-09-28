const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../db');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,

    },
    password: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
userType:Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});

module.exports = User;