const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Booking = sequelize.define('booking',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    guests:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    date_in:{
        type:Sequelize.DATE,
        allowNull:false,

    },
    date_out:{
        type:Sequelize.DATE,
        allowNull: false
    },
     cost:{
         type: Sequelize.INTEGER

     }

});

module.exports = Booking;