const Sequelize = require('sequelize');
const {roomConfiguration,roomType} = require('../models');

const sequelize = require('../util/database');

class commonService{
    static async create({payload,modelName}){
        try{
            const modelInstance = sequelize.build(modelName);
            const save = await modelInstance.create(payload);
        }
        catch(error){
            throw error;
        }


    };

    static async createConfiguration(payload){
        try{
            const saveconfig = await roomConfiguration.create(payload,{
                include:[{
                    model: roomType
                }]
            });
            return saveconfig;

        }
        catch(error){
            throw error;
        }

};
}

module.exports = commonService;