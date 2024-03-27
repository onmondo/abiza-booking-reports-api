export type TGuestBooking = {
    guestName: string;
    rooms: string[];
    checkIn: Date;
    checkOut: Date;
    noOfPax: number;
    noOfStay: number;
    nightlyPrice: number;
    totalPayout?: number;
    from: string;
    modeOfPayment: string;
    datePaid?: Date;
    remarks?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export type TGuestBookingReport = {
    monthlyBookings: TGuestBooking[],
    totalCount: number
}

export type TUpdateGuestBooking<T> = {
    bookingId: string;
    details: T;
};

export type TDeleteBooking = {
    year: string
    month: string
    bookingId: string
}

export type TYearlyBooking = {
    year: string,
    monthlyBookings: [
        {
            month: string,
            details?: {
                guestBookings: TGuestBooking[],
                electricityBill: {
                    date: Date,
                    periodCovered: string,
                    totalBill: number,
                    share: number,
                },
                payables: [
                    {
                        date: Date,
                        particulars: string,
                        totalAmount: number,
                        remarks: string,
                    }                    
                ],
                earning: {
                    bookings: number,
                    expense: number,
                    totalNet: number,
                    shares: [
                        {
                            name: string,
                            rate: number,
                            share: number,
                        }
                    ]
                }                
            },
            createdAt?: Date,
            updatedAt?: Date,
            deletedAt?: Date,            
        }
    ]
}