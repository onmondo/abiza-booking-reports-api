import { ConsumeMessage, Message } from "amqplib";
import MQChannel from "./MQChannel";
import { Command } from "../interaces/Command";

export default class Server {
    static async consumeMessage(
        rpcQueueName: string,
        command: Command
        ) {
        const connection = await MQChannel.getInstance();
        const channel = connection.getChannel();
        // the durable here makes the queue persistent if the value is true
        await channel.assertQueue(rpcQueueName, { durable: false })
        // waits the process to finish before consuming another message from the queue
        channel.prefetch(1); 
        console.log("Awaiting RPC requests")

        channel.consume(rpcQueueName, (message: ConsumeMessage | null) => {
            if (message) {
                console.log("Received: ", message.content.toString())
                const content = JSON.parse(message.content.toString())
                
                command.execute(content)
            }

            channel.sendToQueue(
                message?.properties.replyTo, 
                Buffer.from("New booking persisted to yearly booking!"), 
                { correlationId: message?.properties.correlationId }
            )

            channel.ack(message as Message);

        }, { noAck: false })
    }

    static async receiver(exchangeName: string) {
        const connection = await MQChannel.getInstance();
        const channel = connection.getChannel();
        await channel.assertExchange(exchangeName, "fanout", { durable: false })
        // once the channel closes the queue will be deleted
        const q = await channel.assertQueue("", { exclusive: true })
        console.log(`Waiting for messages in queue: ${q.queue}`)
        channel.bindQueue(q.queue, exchangeName, "");
        channel.consume(q.queue, message => {
            if (message?.content) {
                console.log(`The message is: ${message.content.toString()}`)
            }
        }, { noAck: true })
    }
}