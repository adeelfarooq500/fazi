const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../db');

const Review = sequelize.define('review', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },

    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    review: {
        type: Sequelize.DOUBLE,

    },
    isActive: Sequelize.BOOLEAN
});

module.exports = Review;