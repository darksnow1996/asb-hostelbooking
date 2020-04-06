const {commonService,roomTypeService} = require('../services');

class roomType{
    static async create(req,res,next){
        try{
        const {name} = req.body;
        const payload = {
            name
        }
        const saveroomType = await roomTypeService.create(
            payload
           );
        return res.status(200).json({
            roomtype: saveroomType,
            status: 200
        });
    }
    catch(error){
        next(error);
    }
    
}
}

module.exports = roomType;