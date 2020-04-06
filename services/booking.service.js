const {Room, Booking,roomConfiguration} = require('../models');
const{Op} = require('sequelize');
class bookingService{
    static async getAvailableRooms(){
        try{
            const availablerooms =await Room.findAll({
                include: [{
                    model: roomConfiguration
                },
            {
                model: Booking
            }],
            attributes: ['roomNo']
            });

            let rooms = [];
            let bedtaken = [];

        for (let i = 0; i < availablerooms.length; i++) {
            const roomNo = availablerooms[i].roomNo; 
            const maxbeds = availablerooms[i].roomConfiguration.bed;
            const bookings = availablerooms[i].bookings;
            const cost = availablerooms[i].roomConfiguration.cost;
            console.log(maxbeds);
            
            if(bookings.length == 0){
                const room = {
                    roomNo,
                    status:"available",
                    bed: maxbeds,
                    cost: cost
                };
                rooms.push(room);
            }
            else{
                for (let j = 0; j< bookings.length; j++) {
                bedtaken.push(bookings[j].guests);                                  
                    
                }
                let bedstaken = bedtaken.reduce((acc,a)=>{ return acc + a;},0);
                if(maxbeds > bedstaken){
                    const room = {
                        roomNo,
                        status: "available",
                        bed : maxbeds - bedstaken,
                        cost: cost
                    };
                    rooms.push(room);
                }
                else{
                    const room = {
                        roomNo,
                        status: "unavailable",
                        maxbeds: maxbeds,
                        bed:bedstaken,
                        cost:cost
                    }

                    rooms.push(room);
                }
            }
            
        }

        return rooms;

        }
        catch(error){
            throw error;
        }

    }
    static async availableRooms({guests,checkIn, checkOut}){
        try{
            const bookedrooms = await this.bookedRooms({checkIn,checkOut});
            const rooms = await Room.findAll({
                include: [{
                    model: roomConfiguration
                },
                {
                    model: Booking
                }],
                attributes: ['roomNo']
            });
            let booked = [];
            let available = [];
            if(bookedrooms.length > 0){
            for (let i = 0; i < bookedrooms.length; i++) {
              const roomNo = bookedrooms[i].roomNo;
              booked.push(roomNo);
                
            }
        }
        for (let j = 0; j < rooms.length; j++) {
           const roomNo = rooms[j].roomNo;
           const maxbeds = rooms[j].roomConfiguration.bed;
           if(!booked.includes(roomNo)){
               if(maxbeds >= guests){
               available.push(rooms[j]);
               }
           }
            
        }

        return available;

}
        catch(error){
            throw error;
        }
    }
    static async chooseRandomRoom(rooms){
        try{
            const Rooms = rooms;
            const randomRoom = Rooms[Math.floor(Math.random() * Rooms.length)];
            return randomRoom;


        }
        catch(error){
            throw error;
        }
    }

    static async finalCreate(roompayload,payload){
        try{
        const room = roompayload;
        const roomNo = room.roomNo;
        const savebooking =await this.addBooking({
            roomID: roomNo,
            payload
        });

    return savebooking;
        }
        catch(error){
            throw error;
        }
    }

    static async bookedRooms({checkIn , checkOut}){
        try{
            const checkInn = new Date(checkIn);
            const checkOutt = new Date(checkOut);
            const availablerooms = await Room.findAll({
                include: [{
                    model: roomConfiguration
                },
                {
                    model: Booking,
                    where:{
                       date_in : {[Op.lte]:checkInn},
                       date_out: {[Op.gte]: checkInn},
                       [Op.or]: [{date_in : {[Op.lt]: checkOutt}}, {date_out: {[Op.gte]: checkOutt}}],
                        [Op.or]: [{ date_in: { [Op.gte]: checkInn } }, { date_in: { [Op.lte]: checkOutt } }]
                    },
                
                }],
                attributes: ['roomNo']
            });

            return availablerooms;

        }
        catch(error){
            throw error;
        }

    }


    static async create(payload){
        try{
            const savedbooking = await Booking.create(payload);
            return savedbooking;

        }
        catch(error){
            throw error;
        }
    }

    static async addBooking({roomID,payload}){
        try{
            const room = await Room.findOne({where: {roomNo :roomID}});
            const addbooking = await room.createBooking(payload);
            return addbooking;


        }
        catch(error){
            throw error;
        }
    }

    static async getAllBookings(){
        try{
        const bookings = await Booking.findAll({
            include: [{
                model: Room
            }],
            group: ['booking.roomId','booking.id','room.id']
        
        });
        return bookings;
    }
    catch(error){
        throw error;
    }
}


}
module.exports = bookingService;