class bookingValidation {
    static addBooking(req,res,next) {
    const{guests,checkIn,checkOut} = req.body;
    if(guests == null || checkIn ==null || checkOut ==null){
        return res.status(422).json({
            message : 'Validation error',
            error: "One of the required fields is empty"
        });
    }   

   return next();
    } 
}

module.exports = bookingValidation;