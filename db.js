const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $and: Op.and,
  $like: Op.like,
};
//whatwethink

// const sequelize = new Sequelize('wwt', 'doadmin', 't83g4j5580bj37m6', {
//     dialect: 'mysql',
//     host: 'csdb-mysql-nyc1-07501-do-user-7039297-0.db.ondigitalocean.com',
//     port: 25060,
//     operatorsAliases: operatorsAliases
// });


const sequelize = new Sequelize('fazi', 'root', 'Root', {
  dialect: 'mysql',
  host: 'localhost',
  operatorsAliases: operatorsAliases
});

module.exports = sequelize;
