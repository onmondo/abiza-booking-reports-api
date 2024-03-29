import { Command } from "../interaces/Command";
import PersistYearlyBooking from "../services/PersistYearlyBooking";

export default class PersitBookingCommand implements Command {
    private persistBooking: PersistYearlyBooking;

    constructor(persistBooking: PersistYearlyBooking) {
        this.persistBooking = persistBooking
    }

    async execute(bookingDetails: any): Promise<void> {
        await this.persistBooking.persist(bookingDetails)
    }

}