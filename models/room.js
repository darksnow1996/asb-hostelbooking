const Sequelize = require('sequelize');
const{ roomStatusChoices } = require('../helpers/constants');

const sequelize = require('../util/database');

const Room = sequelize.define('room',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    roomNo:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,

    },

roomStatus:{
    type:Sequelize.ENUM,
    values:[...Object.values(roomStatusChoices)],
    defaultValue:roomStatusChoices.available
} 
    

});

module.exports = Room;