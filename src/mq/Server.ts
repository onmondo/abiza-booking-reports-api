import { ConsumeMessage, Message } from "amqplib";
import MQChannel from "./MQChannel";
import PersistYearlyBooking from "../services/PersistBookingVisitor";

export default class Server {
    static async consumeMessage(
        rpcQueueName: string,
        // persistYearlyBooking: (
        //     bookingDetails: {
        //         year: string,
        //         month: string,
        //         bookingId: string,
        //     }
        // ) => void
        ) {
        const connection = await MQChannel.getInstance();
        const channel = connection.getChannel();
        await channel.assertQueue(rpcQueueName, { durable: false })
        channel.prefetch(1);
        console.log("Awaiting RPC requests")

        channel.consume(rpcQueueName, (message: ConsumeMessage | null) => {
            if (message) {
                console.log("Received: ", message.content.toString())
                const bookingDetails = JSON.parse(message.content.toString())
                
                const persistBooking = new PersistYearlyBooking()
                persistBooking.visitGuest(bookingDetails)
            }

            channel.sendToQueue(
                message?.properties.replyTo, 
                Buffer.from("New booking persisted to yearly booking!"), 
                { correlationId: message?.properties.correlationId }
            )

            channel.ack(message as Message);

        }, { noAck: false })
    }
}