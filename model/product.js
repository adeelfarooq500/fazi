const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../db');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,

    },
    image: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    price:Sequelize.DOUBLE,
    discount:Sequelize.DOUBLE,
    isDiscount:Sequelize.DOUBLE,
    coupon:Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});

module.exports = Product;