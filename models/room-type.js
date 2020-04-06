const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const{bedTypesChoices} = require('../helpers/constants');

const roomType = sequelize.define('roomType',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false

    }
   
    
    

});

module.exports = roomType;