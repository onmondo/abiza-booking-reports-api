require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { envKeys } from "../util/config"
import Server from './mq/Server';
import PersitBookingCommand from './commands/PersistBookingCommand';
import PersistYearlyBooking from './services/PersistYearlyBooking';

// database connection to mongodb thru mongoose
const {
    MONGO_DB_URL, 
    MONGO_DB_PWD, 
} = envKeys();
const connectionBaseUrl: string = MONGO_DB_URL
const connectionPassword: string = MONGO_DB_PWD
const connectionUrl = connectionBaseUrl.replace("<password>", connectionPassword)
mongoose.connect(connectionUrl);

export const app = express()
app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    return res.json({
        message: 'Up and running...'
    })
});

Server.consumeMessage("rpc_queue", new PersitBookingCommand(new PersistYearlyBooking()))
// Server.receiver("getYearlyBookings")

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
    next(err);
    res.sendStatus(404)
    res.render('error', { error: err })
});

const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}`))
