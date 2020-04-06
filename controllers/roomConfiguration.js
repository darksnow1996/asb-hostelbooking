const {commonService,roomTypeService} = require('../services');

class roomConfiguration{

    static async create(req,res,next){
        try{
        const {bed,cost,bedType,roomType} = req.body;
        const payload = {
            bed,
            cost,
            bedType,
            roomTypeId: roomType
        }
        const saveroomConfiguration = await commonService.createConfiguration(
            payload
           );
        return res.status(200).json({
            roomconfiguration: saveroomConfiguration,
            status: 200
        });
    }
    catch(error){
        next(error);
    }
    
}
}

module.exports = roomConfiguration;