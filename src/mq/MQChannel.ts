import amqp, { Channel, Connection } from "amqplib";
import { envKeys } from "../util/config"

export default class MQChannel {
    static getInstace() {
        throw new Error("Method not implemented.");
    }

    private static instance: MQChannel;
    private channel: unknown;
    private connection: unknown;

    private constructor() {
        this.channel = undefined;
        this.connection = undefined;
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

    private async createChannel(): Promise<void> {
        const {
            RABBIT_MQ_URL
        } = envKeys();
        const connection: Connection = await amqp.connect(RABBIT_MQ_URL);
        this.connection = connection;
        this.channel = await connection.createChannel();
    }

    public static async getInstance(): Promise<MQChannel> {
        console.log("Creating new rabitmq instance...")
        MQChannel.instance = new MQChannel()
        await MQChannel.instance.createChannel()
        
        return MQChannel.instance;
    }
}