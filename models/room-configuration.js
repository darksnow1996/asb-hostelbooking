const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const { bedTypesChoices } = require('../helpers/constants');

const roomConfiguration = sequelize.define('roomConfiguration',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    bed:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    bedType: {
        type: Sequelize.ENUM,
        values: [...Object.values(bedTypesChoices)],
        defaultValue: bedTypesChoices.normal

    }
    

});

module.exports = roomConfiguration;