const{roomConfiguration,roomType,Room} = require('../models');
class roomService{
    static async create(payload){
        try{
            const saveroom = await Room.create(payload);

        return saveroom;

        }
        catch(error){
            throw error;
        }
    }
    static async findByPk(id){
        try{
            const room = await Room.findByPk(id);
            return room;

        }
        catch(error){
            throw error;
        }
    }

    static async findRoom(roomNo){
        try{
            const room = await Room.findOne({
                where: {roomNo : roomNo},
                attributes:['roomNo','roomStatus','id'],
                include :[{
                    model: roomConfiguration,
                    attributes: ['bed','cost','bedType'],
                    include: [{
                        model:roomType,
                        attributes: ['name']
                    }]

                },
                
            ]
            });

            return room;


        }
        catch(error){
            throw error;
        }

    }

    static async findAll(){
        try{
            const rooms = await Room.findAll();
            return rooms;
        }
        catch(error){
            throw error;
        }
    }

    static async update(id,payload){
        try{
        const room = await Room.findByPk(id);
        return room.update(payload);
        }
        catch(error){
            throw error;
        }

    }

    
}

module.exports = roomService;
