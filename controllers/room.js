const {roomService} = require('../services');
class roomController{
    static async addRoom(req,res,next){
        try{
        const {roomNo,status,config} = req.body;
        const payload = {
            roomNo,
            roomStatus: status,
            roomConfigurationId: config
        };
        const savedRoom = await roomService.create(payload);
        return res.status(200).json({
            room: savedRoom
        });
        }
        catch(error){
            next(error);
        }

    }

    static async editRoom(req,res,next){
        try{
        const {id} = req.params;
        const room = await roomService.findByPk(id);
        const config = req.body.config || room.roomConfigurationId;
        const roomNo = req.body.roomNo || room.roomNo;
       const payload = {
           roomNo,
           roomConfigurationId:config
       }
        const updateroom = await roomService.update(id,payload);
        res.status(200).json({
            room: updateroom
        });
    }
    catch(error){
        next(error);
    }


    }

    static async getRoom(req,res,next){
        try{
        const {roomNo} = req.params;
        const room = await roomService.findRoom(roomNo);
        res.status(200).json({
            room: room || "No room found"
        });
    }
    catch(error){
        next(error);
    }
    }

}

module.exports = roomController;