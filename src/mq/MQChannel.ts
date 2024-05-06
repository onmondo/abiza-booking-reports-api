import amqp, { Channel, Connection } from "amqplib";
import { envKeys } from "../util/config"

type MQInstance = { connection: Connection, channel: Channel }

export default class MQChannel {
    private static instance: MQChannel;
    private channel: Channel;
    private connection: Connection;

    private constructor({connection, channel}: MQInstance) {
        this.connection = connection;
        this.channel = channel;
    }

    public getChannel(): Channel {
        return this.channel as Channel;
    }

    public getConnection(): Connection {
        return this.connection as Connection
    }

    public closeConnection(): void {
        const connection = this.connection as Connection;
        connection.close();
    }

    public static async getInstance(): Promise<MQChannel> {
        if (!MQChannel.instance) {
            console.log("Creating new rabitmq instance...")
            const {
                RABBIT_MQ_URL
            } = envKeys();
            const connection: Connection = await amqp.connect(RABBIT_MQ_URL || 'amqp://guest:password@localhost');
            const channel = await connection.createChannel();
            MQChannel.instance = new MQChannel({ connection, channel })
        }
        
        return MQChannel.instance;
    }
}