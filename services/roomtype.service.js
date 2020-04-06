const {roomType} = require('../models');
 class roomTypeService{
static async create(payload){
    try{
    const save = await roomType.create(payload);
    return save;
    }
    catch(error){
        throw error;
    }
}
 }

 module.exports = roomTypeService;