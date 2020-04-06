const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const priceCategory = sequelize.define('priceCategory',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,

    }

});

module.exports = priceCategory;