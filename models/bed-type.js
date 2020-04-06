const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const bedType = sequelize.define('bedType',{
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

module.exports = bedType;