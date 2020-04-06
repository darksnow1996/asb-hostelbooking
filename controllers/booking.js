const{bookingService} = require('../services');
class bookingController{
    static async book(req,res,next){
        try {
            const { guests, checkIn, checkOut } = req.body;

            const availableRooms = await bookingService.availableRooms({ guests, checkIn, checkOut });


            if (availableRooms.length > 0) {
                const chooseRoom = await bookingService.chooseRandomRoom(availableRooms);
                const payload = {
                    guests: guests,
                    date_in: checkIn,
                    date_out: checkOut,
                    cost: chooseRoom.roomConfiguration.cost

                };
                const bookRoom = await bookingService.finalCreate(chooseRoom, payload);
                return res.json({
                    availablerooms: availableRooms,
                    bookingdetails: bookRoom
                });
            }
            else {
               return  res.json({
                    message: "The hostel is fully booked"
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    static async getBookings(req,res,next){
        try{

    const bookings = await bookingService.getAllBookings();
    return res.status(200).json({
        message: 'Booking record retrived successfully',
        bookings: bookings
    });
}
catch(error){
    next(error);
}

    }

    static async checkavailablerooms(req,res,next){
        try{
            const rooms = await bookingService.getAvailableRooms();
            return res.status(200).json({
                rooms: rooms
            });

        }
        catch(error){
            next(error);
        }
    }
/*
    static async testavailble(req,res,next){
        try{
            const{guests,checkIn, checkOut} =req.body;
            
            const availableRooms = await bookingService.availableRooms({guests,checkIn,checkOut});


            if(availableRooms.length > 0){
            const chooseRoom = await bookingService.chooseRandomRoom(availableRooms);
            const payload = {
                guests: guests,
                date_in: checkIn,
                date_out: checkOut,
                cost: chooseRoom.roomConfiguration.cost

            };
            const bookRoom = await bookingService.finalCreate(chooseRoom, payload);
            res.json({
                availablerooms: availableRooms,
                bookingdetails: bookRoom
            });
        }
        else{
            res.json({
                message: "The hostel is fully booked"
            });
        }
        }
        catch(error){
            next(error);
        }
    }
    */

}

module.exports = bookingController;